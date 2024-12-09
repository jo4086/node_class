const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            username: {
               type: Sequelize.STRING(50),
               allowNull: true,
            },
            email: {
               type: Sequelize.STRING(100),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         },
      )
   }

   static associate(db) {
      db.User.hasOne(db.Profile, {
         foreignKey: 'UserId',
         sourceKey: 'id',
      })
   }
}
