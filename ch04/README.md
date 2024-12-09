# 시퀄라이저 (Sequelize)

객체 - 데이터베이스를 연결하는 역할

-  ### 시퀄라이저 (Sequelize) 구성 클래스

   -  **Model**
      -  데이터베이스 테이블을 매핑하고 조작하는 데 사용되는 클래스.
      -  확장해서 테이블 구조와 관계를 정의할 수 있음.
      -  _메서드(method)_
         1. init(): 모델 초기화 및 테이블 구조 정의
         2. findAll(), findOne(): 데이터 조회
         3. create(), update(), destroy(): 데이터 조작
   -  **DataTypes**
      -  각 테이블의 필드 타입을 정의하는 데 사용
      -  주요 데이터 타입
         -  `STRING`, `INTEGER`, `BOOLEAN`, `TEXT`, `DATE`, `FLOAT`, `DECIMAL` 등

-  ### ORM(Object Relational Mapping)

   데이터베이스는 객체와 **다른 구조**를 가지므로 DB에 직접 저장하거나 조회 불가능

   **데이터베이스**
   <table style="text-align:center">
      <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>content</th>
            <th>writer</th>
            <th>write_date</th>
          </tr>
      </thead>
      <tbody>
         <tr>
            <td>1</td>
            <td>안녕하세요</td>
            <td>게시글 내용</td>
            <td>글쓴이</td>
            <td>작성일</td>
         </tr>
      </tbody>
   </table>

### 설치 패키지

npm install

-  `express`
-  `morgan`
-  `dotenv`
-  `mysql2`
-  `sequqlize`
-  `-D nodemon`

### config/config.json

```
{
   "development": {
      "username": "root",
      "password": "1234", // 패스워드
      "database": "test", // 데이터베이스명
      "host": "127.0.0.1",
      "dialect": "mysql"
   },
   "test": {
      "username": "root",
      "password": "",
      "database": "",
      "host": "127.0.0.1",
      "dialect": "mysql"
   },
   "production": {
      "username": "root",
      "password": "",
      "database": "",
      "host": "127.0.0.1",
      "dialect": "mysql"
   }
}
```

### Models

연결할 테이블

### 관계 정의

-  1:N or 1:1 관계

   -  받는자(자식): belongsTo(1)
   -  주는자(부모): hasMany(N), hasOne(1)

-  N:M 관계
   -  주고받기 : belongsToMany

```diff
! user.js
+ User는 comment를 많이 가지고 있다(부모다)
   static associate(db) {
      db.User.hasMany(db.Comment, {
         // Comment 모델에서 외래 키로 사용할 컬럼 이름
         foreignKey: 'commenter',
         // User 에서 Comment에게 외래키로 제공할 컬럼 이름
         sourceKey: 'id',
      })
   }

! comments.js
+ Comment는 User의 속해있다(자식이다)
   static associate(db) {
      db.Comment.belongsTo(db.User, {
         foreignKey: 'commenter', // Comment 외래 키 컬럼 이름
         targetKey: 'id', // Comment가 User에서 참조할 컬럼 이름
      })
   }
```

-  1:1 관계 (belongsTo(자식) - hasOne(부모))

-  package.json의 스크립트에 `"start": "nodemon app.js",`를 추가하면 npm start로 실행 가능
