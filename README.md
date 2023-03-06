### 시작하기

1. Node.js 설치하기 (npx 사용하기 위해)
2. `npx create-react-app {폴더 이름}`
   1. 폴더 이름에 `.` 을 입력 ⇒ 현재 디렉토리

### 설치

- `npm start`
  - Starts the development server.
  - 리액트 개발환경이 실행되며 코딩을 할 수 있는 환경이 동작함.
  - 3000번 포트에 리액트가 실행됨
- `npm run build`
  - Bundles the app into static files for production.
  - build
    - 배포판을 만드는 과정
  - `npx serve -s build`
    - build한 결과를 서비스할 때 serve라고 하는 app을 쓰겠다
      - serve는 웹 서버.
        - -s : 사용자가 어떤 경로로 들어오든 index.html 파일을 서비스한다.
        - -s build : build 폴더 안의 index.html 파일을 서비스한다.
- `npm test`

### 수정

- `react-app/src/index.js`
  - 입구 파일
  - `npm start` 를 해서 `create-react-app` 을 구동시키면 `index.js` 를 찾고 거기에 적혀있는 대로 동작함
