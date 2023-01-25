# useState

- 함수형 컴포넌트에서도 가변적인 상태를 지닐 수 있게 함.
    - 함수형 컴포넌트에서 상태를 관리해야 한다면 useState 사용하자
    
    ```jsx
    // Counter.js
    import React, { useState } from "react";
    
    const Counter = () => {
        const [value, setValue] = useState(0)
    
        return <div>
            <p>
                현재 카운터 값은 {value} 입니다.
            </p>
            <button onClick={() => {
                setValue(value + 1)
            }}>+1</button>
            <button onClick={() => {
                setValue(value-1)
            }}>-1</button>
        </div>
    }
    
    export default Counter
    ```
    
    - useState는 코드 상단에서 import 구문을 통해 불러옴
    - `const [value, setValue] = useState(0)`
        - 파라미터에는 상태의 기본값을 넣어줌
        - 이 함수가 호출되면 배열을 반환
            - 첫 번째 원소 : 상태 값
            - 두 번째 원소 : 상태를 설정하는 함수
        - 이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링된다.
    - 하나의 useState 함수는 하나의 상태 값만 관리할 수 있다. 컴포넌트에서 관리해야 할 상태가 여러 개라면 useState를 여러 번 사용하면 된다.
        
        ```jsx
        // Info.js
        import React, { useState } from "react";
        
        const Info = () => {
            const [name, setName] = useState('')
            const [nickname, setNickname] = useState('')
            const onChangeName = e => {
                setName(e.target.value)
            }
            const onChangeNickname = e => {
                setNickname(e.target.value)
            }
            return (
                <div>
                    <input type="text" value={name} onChange={onChangeName} />
                    <input type="text" value={nickname} onChange = {onChangeNickname} />
                    <p>이름 : {name}</p>
                    <p>닉네임 : {nickname} </p>
                </div>
            )
        }
        
        export default Info
        ```
        

# useEffect

- 리액트 컴포넌트가 **렌더링될 때마다** 특정 작업을 수행하도록 설정할 수 있는 Hook
- 기존에 만들었던 Info 컴포넌트에 useEffect 적용해보자!
    
    ```jsx
    // Info.js
    import React, { useState, useEffect } from "react";
    
    const Info = () => {
        const [name, setName] = useState('')
        const [nickname, setNickname] = useState('')
    
        useEffect(() => {
            console.log('렌더링이 완료되었습니다.');
            console.log(
                name,
                nickname
            );
        })
    
        const onChangeName = e => {
            setName(e.target.value)
        }
        const onChangeNickname = e => {
            setNickname(e.target.value)
        }
        return (
            <div>
                <input type="text" value={name} onChange={onChangeName} />
                <input type="text" value={nickname} onChange = {onChangeNickname} />
                <p>이름 : {name}</p>
                <p>닉네임 : {nickname} </p>
            </div>
        )
    }
    
    export default Info
    ```
    

- **마운트될 때만** 실행하고 싶을 때
    - useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 된다.
    
    ```jsx
    // Info.js
    useEffect(() => {
    	console.log('마운트될 때만 실행됩니다.')
    }, [])
    ```
    
- **특정 값이 업데이트될 때만** 실행되고 싶을 때
    - useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어주면 된다.
    
    ```jsx
    // Info.js
    useEffect(() => {
    	console.log(name)
    }, [name])
    ```
    

- useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라짐.

- **컴포넌트가 언마운트되기 전이나 업데이트되기 직전에** 어떠한 작업을 수행하고 싶다면 useEffect에서 **뒷정리 함수 (cleanup)** 를 반환해 주어야 한다.
    
    ```jsx
    // Info.js
    useEffect(() => {
        console.log('effect')
        console.log(name)
        return () => {
            console.log('cleanup')
            console.log(name)
        }
    })
    
    -------------------------------------------------------------------
    
    // App.js
    import React, { useState } from "react";
    
    import Counter from "../Counter";
    import Info from "../Info";
    
    function App() {
    
      const [visible, setVisible] = useState(false)
    
      return (
        <div>
          <Counter></Counter>
          <hr />
          <button onClick={() => {
            setVisible(!visible)
          }}>
            { visible ? '숨기기' : '보이기' }
          </button>
          <hr />
          { visible && <Info/> }
        </div>
      );
    }
    
    export default App;
    ```
    
- 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두 번째 파라미터에 비어있는 배열을 넣으면 됨
    
    ```jsx
    // Info.js
    useEffect(() => {
        console.log('effect')
        console.log(name)
        return () => {
            console.log('cleanup')
            console.log(name)
        }
    }, [])
    ```