
module.exports = (sequelize, DataTypes) => {
    const RefreshTokens = sequelize.define('RefreshTokens', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'refresh_tokens',
        timestamps: true,
        underscored: true 
    });

    return RefreshTokens;
}