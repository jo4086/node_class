## morgan

-  요청과 응답에 대한 정보를 콘솔에 기록

   -  `dev`\
      `[요청방식] [path경로] [HTTP상태코드] [응답속도] ms - [콘텐츠 길이]`\
      `[:method] [:url] [:status] [:response-time] ms - [:res(content-length)]`
   -  `combined`
   -  `common`
   -  `short`
   -  `tiny`

## 조건부 미들웨어에서 매개변수 전달 여부

-  조건부로 미들웨어를 실행할 때, 직접 호출하면 반드시 (req, res, next)를 전달
-  매개변수를 생략하려면 조건부 로직을 감싸는 헬퍼 함수를 활용

```diff
! 예시코드
app.use((req, res, next) => {
  if (req.path === '/secure') {
    authMiddleware(req, res, next); // 조건에 따라 실행
  } else {
    next(); // 조건에 맞지 않으면 다음 미들웨어로 이동
  }
});
-

! 매개변수를 전달해야하는 이유
  미들웨어는 함수. [Express]는 [req, res, next] 객체를 전달하면서 미들웨어 간의 데이터 흐름을 관리

  조건부 실행으로 미들웨어를 호출할 때도, 미들웨어가 [req, res, next] 객체를 필요로 하기 때문에 반드시 매개변수를 전달해야함

  만약 매개변수를 전달하지 않으면, 미들웨어 내부에서 req, res, next가 정의되지 않아 오류가 발생

```

#### 조건부 실행에서 매개변수를 생략할 수 있는 경우

1. 익명 함수를 사용해 조건부 로직을 감싸는 방식

```diff
! 예시코드

- 조건부 함수
const conditionalMiddleware = (condition, middleware) => (req, res, next) => {
  if (condition(req)) {
!   // true: 미들웨어 실행
    return middleware(req, res, next);
  }
! // false: 다음 미들웨어로 이동
  next();
};


+ 함수 호출 사용
app.use(conditionalMiddleware(
! // (condition) : 조건함수의 조건 매개변수
  req => req.path === '/secure',
! // (middleware) : true시 실행받을 미들웨어 매개변수
! // 위에서 리턴 <= [middleware(req, res, next)]
  authMiddleware // 실행할 미들웨어
));
```

2. 커스터마이징한 미들웨어를 반환하는 함수
