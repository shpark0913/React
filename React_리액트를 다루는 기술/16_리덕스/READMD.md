### 액션

- 상태에 어떠한 변화가 필요하면 액션(action)이란 것이 발생

- 액션은 하나의 객체로 표현됨
  
  ```jsx
  {
      type: 'TOGGLE_VALUE'
  }
  ```
  
  - 액션 객체는 type 필드를 반드시 가지고 있어야 함. (type 필드의 값을 액션의 이름이라 생각해도 무방)
  - 그 외의 값들은 상태 업데이트를 할 때 참고해야 할 값이며, 작성자 마음대로 작성 가능

### 액션 생성 함수

- 액션 객체를 만들어주는 함수
  
  ```jsx
  function addTodo(data) {
      return {
          type: 'ADD_TODO',
          data
      }
  }
  
  // 화살표 함수로도 만들 수 있음
  const changeInput = text => ({
      type: 'CHANGE_INPUT',
      text
  })
  ```

- 어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 직접 작성하기 번거롭고, 실수로 정보를 놓칠 수도 있기에 이를 함수로 만들어서 관리!

### 리듀서

- 변화를 일으키는 함수

- 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아서 옴.
  
    → 두 값을 참고해서 새로운 상태를 만들어 반환
  
  ```jsx
  const initialState = {
      counter: 1
  }
  function reducer(state = initialState, action) {
      switch (action.type) {
          case INCREMENT:
              return {
                  counter: state.counter + 1
              }
          default:
              return state
      }
  }
  ```

### 스토어

- 프로젝트에 리덕스를 적용하기 위해 스토어(store)를 만든다.
- 한 개의 프로젝트는 단 하나의 스토어만 가질 수 있다.
- 스토어 안에는 현재 애플리케이션 상태와 리듀서가 들어가 있다.
- 그 외에도 몇 가지 중요한 내장 함수를 지닌다.

### 디스패치

- 스토어의 내장 함수 중 하나.
- 액션을 발생시키는 것
- `dispatch(action)` 과 같은 형태로 액션 객체를 파라미터로 넣어서 호출
- 이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만든다.

### 구독

- 스토어의 내장 함수 중 하나

- subscribe 함수 안에 리스너 함수를 파라미터로 넣어서 호출
  
    → 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출됨
  
  ```jsx
  const listener = () => {
      console.log('상태가 업데이트됨')
  }
  const unsubscribe = store.subscribe(listener)
  
  unsubscribe()    // 추후 구독을 비활성화할 때 함수를 호출
  ```

### Action

- Action은 간단한 JavaScript 객체.
- 작업의 유형을 지정하는 ‘type’ 속성이 있음.
- 선택적으로 redux 저장소에 일부 데이터를 보내는데 사용되는 ‘payload’ 속성을 가질 수도 있음.

```jsx
{ type: 'ADD_TODO', text: 'Read the Redux docs.' }
{ type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
```

### Reducer

- Reducer는 애플리케이션 상태의 변경 사항을 결정하고 업데이트된 상태를 반환하는 함수
- 인수로 조치를 취하고 store 내부의 상태를 업데이트 함.

```jsx
(previousState, action) => nextState
```

- 이전 State와 action object 를 받은 후 next state를 return 한다.

### Redux Store

- 이들을 하나로 모으는 객체 저장소는 애플리케이션의 전체 상태 트리를 보유함.
- 내부 상태를 변경하는 유일한 방법은 해당 상태에 대한 Action을 전달하는 것.
- Redux Store는 클래스가 아닌, 몇 가지 Methods가 있는 객체이다.

### combineReducers

- 여러 리듀서를 사용하기 위해 Root 리듀서를 만들어서 그 아래 서브 리듀서를 넣는다.
- Root 리듀서를 만들 때 사용하는 것이 combineReducers이다.

### Redux Provider

- Provider란?
  - <Provider> 구성 요소는 Redux Store 저장소에 액세스해야 하는 모든 중첩 구성 요소에서 Redux Store 저장소를 사용할 수 있도록 함
  - React Redux 앱의 모든 React 구성 요소는 저장소에 연결할 수 있으므로 대부분의 응용 프로그램은 전체 앱의 구성 요소 트리가 내부에 있는 최상위 수준에서 <Provider>를 렌더링 함.
  - 그 후 Hooks 및 연결 API는 React의 컨텍스트 메커니즘을 통해 제공된 저장소 인스턴스에 액세스할 수 있다.

### useSelector & useDispatch

- provider로 둘러싸인 컴포넌트에서 store 접근
  
  - 리액트에 Hooks가 있듯이 리덕스에도 Hooks가 있는데 그게 바로 useSelector과 useDispatch이다. 이 두 개를 이용해서 provider로 둘러싸인 컴포넌트에서 store에 접근이 가능하다.

- `useSelector`
  
  - useSelector Hooks를 이용해서 스토어의 값을 가져올 수 있음.
  
  ```jsx
  const counter = useSelector((state) => state.counter)
  
  Property 'counter' does not exist on type 'DefaultRootState'.
  
  //////////////////////////////////////////////////////////////////
  // 해결방법
  // 1. Root Reducer에 RootState 타입을 생성하기
  
  const rootReducer = combineReducers({ 
      counter
  })
  
  export default rootReducer
  
  // 2. 생성한 RootState를 State 객체에 제공하기
  const counter = useSelector((state: RootState) => state.counter)
  ```

- `useDispatch` (액션을 보내는 것)
  
  - store에 있는 dispatch 함수에 접근하는 hooks

### 리덕스 미들웨어

- 액션을 dispatch 전달하고 리듀서에 도달하는 순간 사전에 지정된 작업을 실행할 수 있게 해주는 중간자.
- 로깅, 충돌 보고, 비동기 API와 통신, 라우팅 등을 위해 Redux 미들웨어를 사용.