const Sequelize = require('sequelize')

module.exports = class Country extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
           {
              name: {
                 type: Sequelize.STRING(100), // varchar(100)
                 allowNull: false, // not Null
              },
           },
           {
              sequelize,
              timestamps: false,
              underscored: false,
              modelName: 'Country',
              tableName: 'countries',
              paranoid: false,
              charset: 'utf8mb4',
              collate: 'utf8mb4_general_ci',
           },
        )
    }

    static associate(db) {
        db.Country.hasOne(db.Capital, {
            foreignKey: 'CountryId', // Capital에서 외래키로 사용할 Column명
            sourceKey: 'id', // Country => Capital 외래키로 제공할 Column명
        })
    }
}
