## 언제 비동기적인 처리를 하는가?

- 어떠한 명령을 했을 때 그 명령이 언제 끝날지 예측하기 어려운 경우
- 주가 되는 작업이 아닌 경우
    - ex) 통신
        - 서버와 웹 브라우저의 통신은 끝나는 시간 예측 불가능
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4d5cd459-7a9d-48e0-b499-90c2f33c341a/Untitled.png)
        

## fetch

- `const fetchResponsePromise = fetch(resource [, init])`
    - resource는 url
- Return value
    - A Promise that resolves to a Response object.
        - 성공적으로 실행되면 Response 객체를 줄 것
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/395f2940-63b7-4c75-8474-78f28719c881/Untitled.png)
    
    - 함수의 리턴값이 Promise라면 그 함수는 비동기적으로 동작하는 함수일 가능성이 매우 높음
    - 그 함수의 리턴값은 2개의 메소드 이용 가능
        - then
            - 콜백 함수를 받고, 파라미터를 하나 가짐
            - `fetched.then(function(result){})`
            - fetch를 통해 실행한 결과가 성공했을 때 then으로 전달된 호출 함수가 실행됨
                - 그 결과가 파라미터
        - catch
            - 콜백 함수를 받고, 파라미터를 하나 가짐
            - `fetched.catch(function(reason){})`
            - fetch를 통해 실행한 결과가 실패했을 때 catch으로 전달된 호출 함수가 실행됨
                - 그 이유가 파라미터
- Promise를 사용하는 이유
    1. 비동기적인 작업을 처리할 때 성공인지 실패인지를 표준화된 방법으로 처리할 수 있게 해준다.
        - 표준화된 방법
            - 성공했을 때는 then으로 전달된 함수가 실행됨
            - 실패했을 때는 catch로 전달된 함수가 실행됨
    
    ```jsx
    // Nested promise
    fetch('https://jsonplaceholder.typicode.com/posts')
    	.then(function(response){
    		response.json().then(function(data){
    			console.log('data', data)
    		})
    	.catch(function(reason){
    		console.log('reason', reason)
    })
    ```
    
    ```jsx
    // Promise chaining
    // 1번째 방법보단 얘를 많이 씀.
    fetch('https://jsonplaceholder.typicode.com/posts')
    	.then(function(response){
    		return response.json()
    		// response.json() 도 실행하면 Promise. 얘를 return 한 것
    		})
    	.catch(function(reason){
    		console.log('reason', reason)
    	.then(function(data){
    		console.log('data': data)
    })
    ```
    

## New promise

```jsx
<script>
	var job1 = new Promise(function(resolve, reject){
		setTimeout(function() {
			resolve('resolved ok!')
        }, 2000)
    })
	job1.then(function(data){
		console.log('data', data)
	})
</script>
```

```jsx
<script>
function job1() {
		return new Promise(function(resolve, reject){
			setTimeout(function() {
				resolve('resolved ok!')
	        }, 2000)
	    })
		}
	job1().then(function(data){
		console.log('data', data)
	})
</script>
```

## async, await

- promise 적용 전
    
    ```jsx
    timer(1000, function(){
        console.log('작업')
        timer(1000, function(){
            console.log('작업')
            timer(1000, function(){
                console.log('작업')
            })
        })
    })
    ```
    
- promise 적용 후
    
    ```jsx
    timer(1000)
        .then(function(){
            console.log('작업')
            return timer(1000)
        })
        .then(function(){
            console.log('작업')
            return timer(1000)
        })
        .then(function(){
            console.log('작업')
            return timer(1000)
        })
    ```
    
- JS 선배님들의 욕심은 끝이 없다.
    
    ```jsx
    then, function, return 등등이 없이 마치 동기적으로 작동하는 것처럼
    
    timer(1000)
    
    console.log('작업')
    timer(1000)
    
    console.log('작업')
    timer(1000)
    
    console.log('작업')
    
    비동기적인 코드가 동기적인 코드와 똑같이 작동하도록 하고 싶다!
    ```
    
    - 이를 위해서는 제약 조건이 있다!
        1. 비동기적인 함수 앞에 함수가 실행되기를 기다리라는 `await` 붙여라
        2. await가 붙어있는 promise를 return하는 함수는 반드시 다른 함수 안에서 실행되어야!
            1. 그 함수는 async라는 키워드가 앞에 붙어 있어야 한다
        
        ```jsx
        async function run() {
        	await timer(1000)
        	
        				console.log('작업')
        	await	timer(1000)
        	
        				console.log('작업')
        	await	timer(1000)
        	
        				console.log('작업')
        	}
        
        run()
        ```
        

## async, await 예제

```jsx
function timer(time) {
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(time)
        }, time)
    })
}

timer(1000).then(function(time){
    console.log('time:' + time)
    return timer(time+1000)
}).then(function(time){
    console.log('time:' + time)
})
```

```jsx
function timer(time) {
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(time)
        }, time)
    })
}

async function run() {
	console.log('start');
	var time = await timer(1000)
	console.log('time:'+time)
	var time = await timer(time+1000)
	console.log('time:'+time)
	var time = await timer(time+1000)
	console.log('time:'+time)
	console.log('end')
}
run()
```

만약

```jsx
function timer(time) {
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(time)
        }, time)
    })
}

async function run() {
	console.log('start');
	var time = await timer(1000)
	console.log('time:'+time)
	var time = await timer(time+1000)
	console.log('time:'+time)
	var time = await timer(time+1000)
	console.log('time:'+time)
	console.log('end')
}
console.log('parent start')
run()
console.log('parent end')
```

를 하면 parent end가 마지막이 아니다. 비동기적이므로!

- `console.log(run())` 을 하면 `Promise` 가 리턴됨.

```jsx
function timer(time) {
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve(time)
        }, time)
    })
}

async function run() {
	console.log('start');
	var time = await timer(1000)
	console.log('time:'+time)
	var time = await timer(time+1000)
	console.log('time:'+time)
	var time = await timer(time+1000)
	console.log('time:'+time)
	console.log('end')
}

async function run2() {
	console.log('parent start')
	await run()
	console.log('parent end')
}
```

를 실행하면 parent end가 마지막에 뜬다.