- Redux store에 state 보관하는 법

```jsx
import { configureStore, createSlice } from '@reduxjs/toolkit';

// useState의 역할과 비슷
// state 하나를 slice라고 부름
// createSlice({
//    name : 'state 이름',
//     initialState : '값',
//})

let user = createSlice({
    name : 'user',
    initialState : 'kim'
})

let stock = createSlice({
    name : 'stock',
    initialState : [10, 11, 12]
})

// 위에서 정의된 state를 아래에 등록해야 사용 가능
export const store = configureStore({
  reducer: {
        // 작명 : user.reducer
        user : user.reducer,
        stock: stock.reducer
  },
});
```

- Redux store의 state 꺼내는 법
  
  ```jsx
  import { useSelector } from "react-redux"
  
  // Redux store에 있던 모든 state 남음
  let a = useSelector((state)=>{ return state })
  
  console.log(a)         // {user: 'kim', stock: Array(3)}
  console.log(a.user)    // kim
  console.log(a.stock)   // [10, 11, 12]
  ```
  
  - 참고) useSelector 편하게 쓰려면
    
    ```jsx
    let a = useSelector((state)=>{ return state.user })
    
    console.log(a)      // kim
    
    // JS 문법 잘 알고 있다면..?
    let a = useSelector(state => state.user )
    ```
  
  - state가 컴포넌트간 공유가 필요없으면 그냥 useState() 사용하기
    
    - Redux store에 모든 것을 넣을 필요가 없다

- store의 state 변경하는 법
  
  - state 수정해주는 함수 만들기
  - 원할 때 그 함수 실행해달라고 store.js에 요청
  
  ```jsx
  import { configureStore, createSlice } from '@reduxjs/toolkit';
  
  let *user* = createSlice({
      name : 'user',
      initialState : 'kim',
  
  /////////////////////////////////////////////////////
      1. state 수정해주는 함수 만들기
      reducers : {
          changeName(state) {             // state : 기존 state를 뜻함
              return 'john kim'
          }
      }
  /////////////////////////////////////////////////////
  })
  
  /////////////////////////////////////////////////////
  2.
  // state 변경 함수들이 object 형식으로 남을 것
  // 오른쪽 object를 변수로 빼는 문법
  // export let { changeName, 함수2, ... } = user.actions
  export let { changeName } = *user*.actions
  /////////////////////////////////////////////////////
  
  let stock = createSlice({
      name : 'stock',
      initialState : [10, 11, 12]
  })
  
  export const store = configureStore({
    reducer: {
          user : *user*.reducer,
          stock: stock.reducer
    },
  });
  
  /////////////////////////////////////////////////////
  3. 만든 함수 import 해서 사용
  import { useDispatch, useSelector } from "react-redux"
  import { changeName } from "./../store.js"
  
  function Cart() {
      // 다른 코드들...
      let state = useSelector((state)=>state)
  
      // store.js로 요청을 보내주는 함수임
      let dispatch = useDispatch()
  
      <button onClick={() => {
          // dispatch(state변경함수()) 형식으로 사용
          dispatch(changeName())
      }) + </button>
  }
  /////////////////////////////////////////////////////
  ```
  
  요약) Redux state 변경하려면
  
  1. `state 변경해주는 함수 만들기`
  2. `export`
  3. `dispatch(state 변경함수())`
     1. dispatch는 state 변경함수 실행해달라고 store.js에 부탁

- state가 object/array일 경우 변경하는 법
  
  - 이렇게 해도 되긴 하지만
    
    ```jsx
    import { configureStore, createSlice } from '@reduxjs/toolkit';
    
    let user = createSlice({
        name : 'user',
        initialState : { name : 'kim', age : 20 },
        reducers : {
            changeName(state) {             
                return { name : 'park', age : 20 }
            }
        }
    })
    
    export let { changeName } = user.actions
    ```
  
  - array/object의 경우 **직접 수정**해도 state 변경됨
    
    ```jsx
    import { configureStore, createSlice } from '@reduxjs/toolkit';
    
    let user = createSlice({
        name : 'user',
        initialState : { name : 'kim', age : 20 },
        reducers : {
            changeName(state) {             
                state.name = 'park'
            }
        }
    })
    
    export let { changeName } = user.actions
    ```
    
    - 결론 : state가 object/array 면 return 없이 직접 수정해도 됨!!
      - 그래서 문자 하나만 필요해도 일부러 {} 안에 담기도 함
        - ex) `initialState : ‘kim’` ⇒ `initialState : { name : ‘kim’ }`

- +1 말고 가끔 +10, +100 하고 싶을 때 함수 여러 개 만들면 비효율적
  
  ⇒ 함수는 `파라미터 문법` 을 이용하면 비슷한 함수 여러 개 만들 필요가 없음
  
  - state 변경 함수에도 파라미터 문법 사용 가능
  - 파라미터 뚫어놓으면 비슷한 함수 여러 개 필요 없음
  - 파라미터 작명은 보통 action으로 함
    - 화물 뿐 아니라 action에 대한 여러 정보가 들어있기 때문
      - action : state 변경 함수
  
  ```jsx
  let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
      increase(state, action){
        state.age += action.payload   // action.payload : 화물 보낸 것 출력 문법
      }
    }
  })
  
  dispatch(increase(100))            // 100은 메시지에 실어보내는 화물
  ```
  
  - state변경함수의 둘째 파라미터를 작명하면 increase(10) 처럼 파라미터입력을 해서 함수사용이 가능합니다.
  - 파라미터자리에 넣은 자료들은 a.payload 하면 나옴
    - payload : 화물, 소포, 택배
  - increase(10) : +10 됨
  - increase(100) : +100 됨

- 코드가 길다면 알아서 import export 쓰면 됨
  
  - store/userSlice.js 여기에 slice 하나 보관해보자
    
    ```jsx
    import { createSlice } from '@reduxjs/toolkit'
    
    let user = createSlice({
        name : 'user',
        initialState : { name : 'kim', age : 20 },
        reducers : {
            changeName(state){
                state.name = 'park'
            },
            increase(state, action){
                state.age += action.payload
            },
        }
    })
    
    export let { changeName, increase } = user.actions
    
    export default user
    ```
    
    ```jsx
    // store.js
    import user from './store/userSlice.js'
    ```
