const Sequelize = require('sequelize')

module.exports = class Comment extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            comment: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            create_at: {
               type: Sequelize.DATE,
               allowNull: true,
               defaultValue: Sequelize.NOW,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Comment', // 시퀄라이즈에서 사용할 모델 이름(클래스명 작성)
            tableName: 'commmets', //데이터베이스에서 사용할 네임명
            paranoid: false, // 소프트삭제 (soft delete) 활성화 여부
            charset: 'utf8mb4', // DB생성시 charset과 같이 사용
            collate: 'utf8mb4_general_ci', // DB생성시 collate와 똑같이 사용
         },
      )
   }

   static associate(db) {
      /** db.[Self_modelName].[belongsTo(db.[Reference_modeName] {})]
       * [Self_modelName]: 자신의 모델(클래스)명
       * [Reference_modelName]: 참조할 모델(클래스)명
       * [belongsTo.(db.A), {B}]: A에게 제공받는상태
       *
       */
      db.Comment.belongsTo(db.User, {
         foreignKey: 'commenter', // Comment 외래키 Column명
         targetKey: 'id', // Comment가 User에서 참조할 Column명
      })
   }
}
