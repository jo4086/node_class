const Sequelize = require('sequelize')

module.exports = class Author extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            // 컬럼명 정의: name, age
            name: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            age: {
               type: Sequelize.INTEGER.UNSIGNED,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Author',
            tabalName: 'authors',
            paranoid: 'false',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         },
      )
   }

   // Book에 제공할 컬럼명 : id
   // Book에서 사용할 외래키 컬럼명 : Authorld
   static associate(db) {
      db.Author.hasMany(db.Book, {
         foreignKey: 'AuthorId',
         sourceKey: 'id',
      })
   }
}
