const Sequelize = require('sequelize')

module.exports = class Book extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            // 컬렴정의하기 [ title, genre ]
            title: {
               type: Sequelize.STRING(200),
               allowNull: false,
            },
            genre: {
               type: Sequelize.STRING(50),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Book',
            tableName: 'books',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         },
      )
   }

   static associate(db) {
      db.Book.belongsTo(db.Author, {
         foreignKey: 'AuthorId',
         targetKey: 'id',
      })
   }
}
