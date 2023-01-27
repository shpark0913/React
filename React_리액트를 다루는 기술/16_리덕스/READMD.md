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