module.exports = {
    up(query, DataTypes) {
        return query.createTable('missions', {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            shipId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'ships',
                    key: 'id'
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
        })
    },
    down(query) {
        return query.dropTable('missions')
    },
};
