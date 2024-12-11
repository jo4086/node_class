1. app.use(morgan('dev'))
   설명:
   **morgan**은 HTTP 요청을 로깅하는 미들웨어입니다.
   'dev' 옵션은 개발 환경에 적합한 간단한 로그 형식을 제공합니다.
   역할:
   각 요청에 대해 다음과 같은 정보를 로그로 출력:
   HTTP 메서드 (예: GET, POST)
   요청 URL
   상태 코드 (예: 200, 404)
   응답 시간
   디버깅 및 개발 중 요청과 응답 상태를 확인하는 데 유용.
2. app.use(express.static(path.join(**dirname, 'public')))
   설명:
   **express.static**은 정적 파일(예: HTML, CSS, JS, 이미지)을 제공하는 미들웨어입니다.
   path.join(**dirname, 'public')은 현재 디렉토리의 public 폴더를 정적 파일 제공 경로로 설정합니다.
   역할:
   브라우저가 정적 파일에 접근할 수 있도록 서빙.
   예: public/style.css 파일은 /style.css 경로로 접근 가능.
3. app.use(express.join)
   설명:
   오타: express.join은 존재하지 않는 메서드입니다.
   올바른 코드인지 다시 확인이 필요합니다.
   이 코드가 의도한 기능을 이해하려면 전체 맥락을 봐야 합니다.
   의심되는 올바른 코드:
   정적 파일 제공이라면 app.use(express.static(...))가 올바릅니다.
4. app.use(express.urlencoded({ extended: false }))
   설명:
   **express.urlencoded**는 URL-encoded 데이터를 파싱하는 미들웨어입니다.
   폼 데이터를 처리할 때 주로 사용.
   { extended: false }는 querystring 모듈을 사용하여 단순 객체를 생성.
   역할:
   Content-Type: application/x-www-form-urlencoded 형식의 요청 데이터를 파싱.
   예: HTML 폼 데이터를 처리할 수 있도록 변환.

morgan: 클라이언트로부터 들어오는 요청 정보를 로깅.

express.static: public 폴더 안의 정적 파일을 클라이언트에게 제공.

express.json: 클라이언트에서 보낸 JSON 형식의 데이터를 파싱해 req.body에 저장.

express.urlencoded: 클라이언트에서 보낸 URL-encoded 데이터를 파싱해 req.body에 저장.
