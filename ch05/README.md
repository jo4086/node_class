### sns-api

-  백엔드 서버 폴더

### sns-frontend

-  프론트 폴더

### 라이브러리 목록

-  `"bcrypt": "^5.1.1"` : 암호화
-  `"passport": "^0.7.0"` : 로그인
-  `"passport-local": "^1.0.0"` : 로그아웃
-  `"cors": "^2.8.5"`: 웹 브라우저의 보안상 이유로 출처(Origin)가 다른 request를 제한,\
    출처(Origin)=프로토콜(http/https) + 도메인 + 포트번호
      - 리액트 클라이언트 측 : `http://localhost:3000`,
      - Node.js 서버 측 : `http://localhost:3000`,
    
    => en rudfhrk ekfmamfh dpfj



### 백엔드(SNS-api)

### routes/
- post.js : 글쓰기 수정 삭제 조회기능
   - multer를 사용하여 이미지 업로드도 가능하게 할 것