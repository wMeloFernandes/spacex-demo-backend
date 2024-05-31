import { gql } from 'graphql-tag';

export const Ship = gql`
  type Mission {
    id: ID!
    name: String
  }

  type Ship {
    id: ID!
    name: String
    class: String
    image: String
    active: Boolean!
    Missions: [Mission]
  }

  input ShipsInput {
    pagination: PaginationInput!
  }
`;
