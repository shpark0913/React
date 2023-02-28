## 😁 Redux 사용하기

1. Using Create React App
   
   - 공식 문서에서 추천하는 방법
     
     - 공식 Redux+JS 템플릿 혹은 Redux+TS 템플릿 사용
       - Redux Toolkit 사용 가능
       - Redux와 React component의 통합 용이
     
     ```jsx
     # Redux + Plain JS template
     npx create-react-app my-app --template redux
     
     # Redux + TypeScript template
     npx create-react-app my-app --template redux-typescript
     ```

2. An Existing React App
   
   - dependency 설치
     
     ```jsx
     # If you use npm:
     npm install react-redux
     
     # Or if you use Yarn:
     yarn add react-redux
     ```
     
     - 추가로 Redux를 install하고 app에 Redux store을 설정해야 함

## 😁 API Overview

- `Provider`
  
  - React Redux는 `<Provider />` component 가짐
    - Redux store을 app의 나머지 부분에서 사용 가능하게 함
  
  ```jsx
  import React from 'react'
  import ReactDOM from 'react-dom/client'
  
  import { Provider } from 'react-redux'
  import store from './store'
  
  import App from './App'
  
  // As of React 18
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  ```

- `Hooks`
  
  - React Redux는 custom React hooks 제공
    - Redux store과 React components를 상호작용하게 함
  - `useSelector`
    - store에 저장된 값을 읽음
    - update를 subscribe함 (변화를 감지)
  - `useDispatch`
    - action을 dispatch할 수 있도록 store의 dispatch를 리턴함
  
  ```jsx
  import React from 'react'
  import { useSelector, useDispatch } from 'react-redux'
  import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    selectCount,
  } from './counterSlice'
  import styles from './Counter.module.css'
  
  export function Counter() {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()
  
    return (
      <div>
        <div className={styles.row}>
          <button
            className={styles.button}
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
          <span className={styles.value}>{count}</span>
          <button
            className={styles.button}
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
        </div>
        {/* omit additional rendering output here */}
      </div>
    )
  }
  ```

## 😁 Integrating Redux with a UI

- 모든 UI layer와 Redux를 사용하려면 다음의 일관된 단계들이 필요
  1. Redux store 만들기
  2. update를 subscribe 하기
  3. subscription callback 내부
     1. 현재 store state 가져오기
     2. a로부터 UI의 부분에서 필요한 data 추출
     3. UI를 b의 data로 update
  4. 필요하다면, UI를 초기 state로 render
  5. Redux action을 dispatch 해서 UI의 input에 반응

## 😁 React Redux Quick Start

- Redux Toolkit을 React Redux와 사용하는 법을 학습할 것

### React app 만들기

`npx create-react-app my-app --template redux`

### Install Redux Toolkit and React Redux

`npm install @reduxjs/toolkit react-redux`

### Create a Redux Store

- `src/app/store.js` 파일 생성
- Redux Toolkit에서 import `configureStore` API
- 빈 Redux store을 만들고, export 한 후 시작해보자

```jsx
// app/store.js

import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})
```

- 이렇게 하면 Redux Store가 생성되고, Redux DevTools extension을 자동으로 구성하여 개발하는 동안 store 검사 가능

### Provide the Redux Store to React

- store가 생성되면 src/index.js의 application에 React Redux `<Provider>` 을 배치하여 이를 이용할 수 있음
- 생성했던 Redux store을 import하고, `<App>` 주변에 `<Provider>` 을 배치한 후 store을 prop으로 전달함

```jsx
// index.js

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

### Create a Redux State Slice

- `src/features/counter/counterSlice.js` 파일을 생성
  - Redux Toolkit으로부터 `createSlice` API를 import
- slice를 만드는 것은 다음을 요구함
  1. string name
     1. slice를 구분하기 위해
  2. initial state value
  3. 1개 이상의 reducer functions
     1. state가 update되는 방법을 정의하기 위해

```jsx
// features/counter/counterSlice.js

import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

### Add Slice Reducers to the Store

- counter slice로부터 reducer ftn을 import하고 store에 넣어야 함.

```jsx
// app/store.js

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

### Use Redux State and Actions in React Components

- 이제 Redux store과 React components가 상호작용할 수 있도록 React Redux hook 사용 가능

- `useSelector`
  
  - store의 data를 읽을 수 있음

- `useDispatch`
  
  - action을 dispatch할 수 있음

- `<Counter>` component 가 포함된 `src/features/counter/Counter.js` 생성
  
  ```jsx
  // features/counter/Counter.js
  
  import React from 'react'
  import { useSelector, useDispatch } from 'react-redux'
  import { decrement, increment } from './counterSlice'
  import styles from './Counter.module.css'
  
  export function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
  
    return (
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    )
  }
  ```

- `App.js`로 import하고 `<App>` 에 render하기

- 이제 Increment, Decrement btn 클릭 가능
  
  - 상응하는 Redux action이 store에 dispatch됨
  - counter slice reducer가 aciont을 인식해 state를 update
  - `<Counter>` component는 새로운 state 값을 store로부터 인식 후 new data로 re-render함

# 😁 요약

- `configureStore` 로 Redux store 생성
  - `configureStore` 은 `reducer function` 을 변수로 받아들임
  - `configureStore` 은 default settings로 store을 자동으로 초기 설정함
- Redux store을 React component에 제공
  - `<App />` 을 React Redux `<Provider>` 안에 넣음
  - Redux store을 `<Provider store={store}>` 로 전달
- `createSlice` 를 이용해 Redux “slice” reducer 생성
  - name, initial state, named reducer ftns을 가진 `createSlice` 호출
  - Reducer ftn은 state를 변경시킬 수 있음
  - 생성된 slice reducer와 action creator를 export함
- React component에서 `useSelector / useDispatch` 사용
  - useSelector hook
    - store의 data를 read
    - useDispatch hook으로부터 `dispatch` ftn 얻고, 필요한 action을 dispatch 함
