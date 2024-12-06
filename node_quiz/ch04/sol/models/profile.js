const Sequelize = require('sequelize')

module.exports = class Profile extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            bio: {
               type: Sequelize.STRING(255),
               allowNull: true,
            },
            avatarUrl: {
               type: Sequelize.STRING(255),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: false,
            modelName: 'Profile',
            tableName: 'profiles',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Profile.belongsTo(db.User, {
         foreignKey: 'UserId',
         targetKey: 'id',
      })
   }
}
