# Node.js에 대해서

## Node.js의 특징

-  ### [JavaScript 런타임](#1-javascript-런타임)
-  ### [이벤트 기반](#2-이벤트-기반)
-  ### [논 블록킹 모델](#3-논-블록킹-모델)
-  ### [I/O 모델](#4-io-모델)
-  ### [싱글 스레드](#5-싱글-스레드)
-  ### [적용 사례](#6-적용-사례)

## [1. JavaScript 런타임](#nodejs의-특징)

자바스크립트 엔진 中 하나인 [V8 엔진](#v8-엔진)을 기반으로 동작, 서버 사이드에서도 JavaScript를 활용할 수 있게 해줌

-  #### **V8 엔진**

   -  구글이 개발한 자바스크립트 엔진
   -  인터프리터의 느린 실행속도를 독자적인 [JIT 컴파일](#3-jit-컴파일-돌아가기) 구조를 개발하여 획기적으로 속도를 향상시킴

---

#### 코드 실행 모델

#### 1. **인터프리터**

한 줄씩 코드를 기계어로 변환하여 실행

-  장점 : 초기 실행 속도가 빠름
-  단점 : 반복적인 작업에서 비효율적이며 전체 실행 속도가 느려짐
-  적용 모델
   -  초기의 JavaScript 엔진 (SpiderMonkey)\
   -  Python의 기본 실행 환경

---

#### 2. **컴파일러**

코드 전체를 읽고 분석 => 한 번에 기계어로 변환 후 실행

-  장점 : 반복 작업일수록 전체 실행 속도는 매우 빨라짐
-  단점
   -  초기 변환 시간은 느림
   -  코드 수정시 전체를 다시 읽어야 하므로 개발 과정에서 비효율적

---

#### 3. **JIT 컴파일** [<span style="font-size:0.8em;">(돌아가기)</span>](#1-javascript-런타임)

인터프리터와 컴파일러의 하이브리드 모델, 실행 시점에서 코드 분석 및 최적화하여 실행

> 구글 V8 엔진에서의 표현
>
> -  인터프리터 : Ignition
> -  컴파일러 : Turbofan

-  **파싱 & AST 생성**

   -  1차로 파서에서 소스코드 전체를 토큰화(키워드, 변수명, 연산자 등), 구문 분석
   -  분석한 코드를 <AST(Abstract Syntax Tree)>형태로 데이터 최적화

-  **바이트코드 생성**

   -  최적화한 데이터(AST)를 바이트코드 컴파일러(Bytecode Generator)를 통해 중간 단계인 \<바이트코드> 생성
   -  AST 과정을 거친 바이트코드는 인터프리터와 컴파일러가 읽는데 최적화된 형태를 가짐

-  **인터프리터 1차 엔진 실행**

   -  바이트코드를 한 줄씩 실행하며 기계어로 변환
   -  변환 도중 반복적으로 사용되는 <**핫스팟 코드**>를 컴파일러로 전달

*  **컴파일러 2차 엔진 실행**

   -  인터프리터에 전달받은 <**핫스팟 코드**>들을 기계어로 변환후 누적시키며 캐싱함
   -  재사용이 되는 코드들은 컴파일러에서 저장한 미리 번역된 기계어를 바로 가져다 사용
   -  인터프리터는 해당 코드는 다시 번역하지 않게 되니 전체적으로 속도가 향상됨

---

## [2. 이벤트 기반](#nodejs의-특징)

-  프로그램의 실행 흐름이 **이벤트(event)** 에 따라 결정
-  특정 작업이 완료되거나 이벤트가 발생했을 때 콜백 함수를 호출하여 처리함

---

## [3. 논 블록킹 모델](#nodejs의-특징)

-  I/O 작업(파일 읽기, 데이터베이스 요청, 네트워크 요청 등)이 완료될 때까지 프로그램의 실행을 멈추지 않고 계속 다른 작업을 처리
-  Node.js는 논블로킹 콜백을 사용하여 결과가 준비되었을 때만 해당 작업을 처리

```diff
function longTimeTask() {
! // 긴 작업의 코드
  console.log('첫번째 코드 시작')
  console.log('첫번째 코드 작업 완료')

}

console.log('전체 코드 시작')
setTimeout(longTimeTask, 0)
console.log('두번째 코드 시작')

! 출력결과
전체 코드 시작
두번째 코드 시작
첫번째 코드 시작
첫번째 코드 완료
```

---

## [4. I/O 모델](#nodejs의-특징)

데이터의 입출력을 처리하는 방식으로 논 블록킹과 연관된 개념 **[BUT !!]** 동일한 개념은 아님

-  논 블록킹

   -  작업이 완료될 때까지 기다리지 않고, 다른 작업을 계속 처리할 수 있는 실행 방식
   -  개념적인 구조로 I/O 작업 외에 CPU 작업 등에도 적용 가능함

-  I/O 모델

   -  입출력 작업(예: 파일 읽기, 데이터베이스 요청, 네트워크 요청)을 처리하는 방식
   -  Node.js는 논블로킹 비동기 I/O 모델을 채택하여 효율적인 입출력을 지원

#### Node.js의 I/O모델 특징

1. 이벤트 루프(Event Loop)

   -  Node.js는 싱글 스레드에서 실행되지만, 이벤트 루프를 통해 백그라운드에서 실행된 작업의 완료 여부를 관리
   -  이벤트가 발생하면 콜백을 실행하여 결과를 처리

2. 백그라운드 스레드

   -  파일 시스템, 네트워크, 데이터베이스 등 I/O 작업은 백그라운드 스레드에서 비동기로 처리
   -  완료된 작업은 이벤트 루프를 통해 메인 스레드에 전달

3. I/O 요청 흐름
   -  I/O 요청을 시작 → 백그라운드에서 비동기로 처리 → 완료되면 이벤트 루프에서 콜백 실행

#### 장점

1. 동시성
   -  동시에 여러 코드 처리 가능
   -  블록킹 없이 빠른 응답 제공함
2. 효율적 자원 사용
   -  싱글 스레드 기반으로 동작하므로, [**스레드 관리 오버헤드**]가 적음
   -  비동기 처리 덕분에 CPU와 메모리 리소스를 효율적으로 활용

> #### 스레드 관리 오버헤드란?
>
> 스레드 관리 오버헤드는 다음과 같은 작업을 개발자나 시스템이 신경 써야 하는 경우를 의미
>
> -  스레드 생성 및 소멸
> -  작업 간 스레드 동기화(뮤텍스, 세마포어 등)
> -  스레드 간 리소스 공유 문제 해결(데드락 방지 등)

---

## [5. 싱글 스레드](#nodejs의-특징)

-  Node.js는 단일 스레드에서 JavaScript 코드를 실행
-  **BUT** I/O 작업이나 네트워크 요청 등은 백그라운드 스레드를 활용하여 병렬로 처리 (기본 4개의 스레드 생성)
-  장점 : 코드의 관리는 하나에 집중화하여 동기화 문제와 같은 복잡한 작업을 줄일 수 있음
-  주의점
   -  싱글 스레드라고 해서 모든 작업이 순차적으로 실행되는 것은 아님
   -  이벤트 루프와 비동기 처리를 통해 높은 성능을 발휘

```diff
console.log('Task 1')
setTimeout(() => console.log('Task 2'), 1000)
console.log('Task 3')
! Task 2는 1초 후 실행
! 나머지는 싱글 스레드에서 순서대로 처리
```

---

### 싱글 스레드의 쉬운 비유

#### 식당 카운터의 오너

-  Node.js의 [**싱글 스레드**] 에 해당
-  오너는 한 번에 한 손님씩 주문을 받고 기록
-  직접 요리하지 않으며 주방에 있는 요리사들에게 전달

#### 주방의 요리사들

-  Node.js의 [**백그라운드 작업 처리(스레드 풀)**] 에 해당
-  요리사들은 [**주문된 요리(비동기 작업) 병렬처리**] 를 처리하며, 오너와 독립적으로 일함

#### 조리 순서와 제공 순서의 차이

-  조리 완료 순서는 [**논블로킹 I/O**] 에 해당
-  요리사들은 각자 조리가 끝난 순서대로 오너에게 전달
-  오너는 조리된 요리를 손님에게 바로바로 제공하면서도 기다리지 않고 다음 손님의 주문을 받음

식당 카운터에서 오너(싱글 스레드)가 차례대로 주문을 받음\
=> 받은 주문을 주방의 여러 주방장(백그라운드 작업 처리 - 스레드풀)들에게 순차적으로 전달하여 조리를 하게함\
=> 받은 주문 순이 아닌 조리가 완료된 순서대로 카운터에 있는 오너에게 전달\
=> 오너는 조리가 완료된 순으로 손님에게 음식 제공

---

## [6. 적용 사례](#nodejs의-특징)

#### Node.js가 사용된 실제 서비스

-  Netflix : 빠른 스트리밍 및 대규모 사용자 요청 처리
-  PayPal : RESTful API 기반 결제 시스템 구축
-  LinkedIn : 실시간 업데이트 및 채팅 서비스
-  Uber : 실시간 요청과 응답을 처리하는 마이크로서비스 아키텍처

#### Node.js의 주요 적용 영역

1. 웹 애플리케이션

   -  빠른 요청/응답 처리와 비동기 작업에 최적화되어 있어 REST API 서버 및 실시간 웹 애플리케이션 개발에 적합
   -  챗 애플리케이션: 실시간 채팅 기능(예: Slack, Discord)
   -  **SPA(Single Page Application)** 의 백엔드 서버
   -  eCommerce 플랫폼: 상품 정보 및 주문 처리

2. 실시간 애플리케이션

   -  Node.js의 WebSocket을 활용하여 실시간 데이터 교환이 필요한 서비스에 적합
   -  실시간 협업 도구(예: Google Docs, Trello)
   -  온라인 게임 서버
   -  실시간 데이터 스트리밍(예: 주식 거래 플랫폼, IoT 애플리케이션)

3. 마이크로서비스 아키텍처

   -  경량화된 모듈 기반 설계와 빠른 비동기 처리로 마이크로서비스 구현에 적합
   -  대규모 시스템에서 독립적인 서비스 간 통신(예: Netflix, Uber)
   -  API Gateway

4. 서버리스 컴퓨팅

   -  서버리스 환경(AWS Lambda, Google Cloud Functions)에서 실행되는 함수형 애플리케이션 개발
   -  이벤트 기반 데이터 처리
   -  백엔드에서 간단한 작업 처리

5. 파일 및 데이터 스트리밍

   -  스트림 API를 사용하여 대규모 파일을 효율적으로 읽거나 쓰는 작업에 적합
   -  대규모 로그 파일 처리
   -  미디어 스트리밍 서비스(예: Netflix, YouTube)

6. IoT(사물인터넷)

   -  경량화된 비동기 처리 모델로 IoT 기기와 서버 간 실시간 데이터 교환에 적합
   -  IoT 디바이스 데이터 수집 및 분석
   -  스마트홈 관리 시스템

7. 데스크톱 애플리케이션

   -  Node.js 기반의 Electron 프레임워크를 활용하여 데스크톱 애플리케이션을 개발
   -  VSCode(Visual Studio Code)
   -  Slack 데스크톱 클라이언트
   -  Spotify 데스크톱 앱

8. 백엔드 API 서버

   -  RESTful API 서버나 GraphQL 서버 구축
   -  모바일 앱과 통신하는 백엔드 서버
   -  데이터 제공 API(예: Weather API, Geolocation API)
