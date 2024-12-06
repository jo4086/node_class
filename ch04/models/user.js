const Sequelize = require('sequelize')

// class명은 파일명과 똑같이 작성 && 대문자로 시작
module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            // name컬럼 정의
            name: {
               type: Sequelize.STRING(20), // 최대 20글자
               allowNull: false, // null 제약조건 => not null
               uniqe: true, // unique 제약조건 => 중복허용 x
            },
            // age컬럼 정의
            age: {
               type: Sequelize.INTEGER.UNSIGNED, // 양수만 허용하는 정수
               allowNull: false,
            },
            // married 컬럼 정의
            married: {
               type: Sequelize.BOOLEAN,
               allowNull: false,
            },
            // comment 컬럼 정의
            comment: {
               type: Sequelize.TEXT,
               allowNull: true,
            },
            // create_at 컬럼 정의
            create_at: {
               type: Sequelize.DATE, // 현재 시간 저장
               allowNull: false, // null을 허용하지 않음
               defaultValue: Sequelize.NOW, // 디폴트값과 현재시간 설정
            },
         },
         {
            sequelize,
            /** [timestamps]
             * 자동생성되는 [createAt, updateAt] 컬럼을 활성여부
             * createAt: 테이블에 insert할 때 날짜와 시간값을 자동으로 insert하는 column
             * updateAt: 테이블에 update할 때 날짜와 시간값을 자동으로 insert하는 컬럼
             ***/
            timestamps: false,
            underscored: false, // 컬럼이름을 카멜케이스로 유치할껀가 false = X
            modelName: 'User', // 시퀄라이즈에서 사용하는 모댈이름(클래스명)
            tobalName: 'users', // 데이터베이스에서 사용하는 실제 테이블 명
            paranoid: false, // 소프트 삭제를 비활성화
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         },
      )
   }

   static associate(db) {
      // User 모델이 Comment 모델과 1:N 관계를 가짐
      db.User.hasMany(db.Comment, {
         foreignKey: 'commenter', // Comment 모델에서 외래 키로 사용할 컬럼 이름
         sourceKey: 'id', // User 모델에서 Comment에게 외래키로 제공할 컬럼 이름
      })
   }
}

/** [super.init {}]
 * 정해진틀...?? 같은것이라고함
 * 프라이머리키는 자동으로 생성되기에 정의하지 않아도 됌
 * 여기서는 생성할 컬럼을 순서대로 적는다.
 **/

/** static associate(db) {}
 * db.[Self_modelName].<hasMany>(db.[Reference_modelName], {})
 * <hasMany> : 해당 테이블이 참조테이블을 포함한다고 선언
 */
