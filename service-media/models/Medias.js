module.exports = (sequelize, DataTypes) => {
    const Medias = sequelize.define('Medias', { // Gunakan 'Medias' agar sesuai dengan db.Medias
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'medias',
        timestamps: true, // Otomatis menambahkan createdAt & updatedAt
        underscored: true // Mengubah `createdAt` menjadi `created_at`
    });

    return Medias; // Harus sesuai dengan db.Medias
};
