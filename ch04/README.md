# 시퀄라이저 (Sequelize)

객체 - 데이터베이스를 연결하는 역할

-  ### 시퀄라이저 (Sequelize) 구성 클래스

   -  **1. Model**
      -  데이터베이스 테이블을 매핑하고 조작하는 데 사용되는 클래스.
      -  확장해서 테이블 구조와 관계를 정의할 수 있음.
      -  _메서드(method)_
         1. init(): 모델 초기화 및 테이블 구조 정의
         2. findAll(), findOne(): 데이터 조회
         3. create(), update(), destroy(): 데이터 조작
   -  **2. DataTypes**
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

   -  받는자(자식, targetKey): belongsTo(1)
   -  주는자(부모, sourceKey): hasMany(N), hasOne(1)

-  N:M 관계
   -  주고받기 : belongsToMany
   -  교차테이블 : `{through: '교차테이블'}`

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

##

### 시퀄라이저를 통한 MySQL 테이블 생성 및 RESTful 상호작용

RESTful 설명 링크: https://velog.io/@somday/RESTful-API-%EC%9D%B4%EB%9E%80

가상 Request 호출 : https://hoppscotch.com/download

호프스카치를 이용해 가상으로 RESTful API 통신 호출

1. [**테이블 생성 (mkdir - models/)**](#1-테이블-생성-mkdir---midels)
2. [**라우트 생성 (mkdir - routes/)**](#2-라우트-생성-mkdir---routes)
3. [**app.js의 다양한 미들웨어 처리**](#3-appjs의-다양한-미들웨어-처리)

#### 1. 테이블 생성 (mkdir - midels/)

-  Sequelize를 사용하여 MySQL 데이터베이스에 TABLE생성 및 `1:1, 1:N, N:M` 관계 구현,

-  **index.js** : 모델들의 관계 설정 및 DB 동기화

-  **테이블 작성**
   -  **1:N 테이블**\
       ├─ `comments` **<=(제공)=** `users`\
       ├─ `comment.js: (belongsTo - targetKey)`\
       └─ `user.js: (hasMany - sourceKey)`
   -  **1:1 테이블**\
       ├─ `capitals` **<=(제공)=** `countries`\
       ├─ `capital.js (belongsTo - targetKey)`\
       └─ `country.js (hasOne - sourceKey)`
   -  **N:M 테이블**\
       ├─ `posts` **=>( `posthashting` )<=** `hashtags`\
       ├─ `post.js (belongsToMany)`\
       ├─ `hashtag.js (belongsToMany)`\
       └─ `{through: posthashting}`

#### 2. 라우트 생성 (mkdir - routes/)

-  CRUD와 HTTP 매서드의 관계\
    => RESTful API 요청은 CRUD작업과 연결됌\
    => 클라이언트는 HTTP 매서드를 사용하여 서버에 CRUD 작업을 요청\
    => 서버는 이를 수행하여 데이터베이스와 상호작용.

| CRUD 작업 | HTTP 메서드 | 설명          |
| --------- | ----------- | ------------- |
| Create    | POST        | 데이터를 생성 |
| Read      | GET         | 데이터를 읽기 |
| Update    | PATCH / PUT | 데이터를 수정 |
| Delete    | DELETE      | 데이터를 삭제 |

-  models - **`comment.js & user.js`** 테이블의 **`RESTful`** 상호작용 구현
-  **routes/**
   -  index.js: 라우트 중앙 관리파일
   -  comments.js: 댓글 모델의 CRUD 처리 (`../models/comment`의 라우트 파일)
   -  users.js: 사용자 모델의 CRUD 처리 (`../models/user`이 라우트 파일)

#### 3. app.js의 다양한 미들웨어 처리

##

findAll() = select \* from users;
