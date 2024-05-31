if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
import { db } from '../models';
import { cleanDb } from '../helpers/testHelpers';
import fetch from 'node-fetch';
import { umzug } from '../migrate'
import { faker } from '@faker-js/faker';

const populate = async () => {
  await cleanDb();
  // Checks migrations and run them if they are not already applied.
  await umzug.up();
  console.log('Populating database...');

  const ships = await fetch('https://spacex-production.up.railway.app/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '{ ships { id name image class active } }' }),
  })
    .then(res => res.json())
    .then(data => data.data.ships);

  const shipRows = await Promise.all(
    ships.map((ship: any) => {
      return db.Ship.create({
        active: ship.active,
        name: ship.name,
        class: ship.class,
        image: ship.image,
      });
    }),
  );

  const shipIds = shipRows.map((ship) => ship.dataValues.id)

  await Promise.all(shipIds.map((shipId) => {
    return db.Mission.create({
      name: faker.music.songName(),
      shipId
    })
  }))

  await db.sequelize.close();
};

if (require.main === module) {
  populate();
}

export { populate };
