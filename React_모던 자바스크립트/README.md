# 변수와 상수

- 변수와 상수는 특정 이름에 특정 값을 담을 때 사용
  
  ex) value라는 이름에 1이라는 값을 넣어보자
  
  - `let value = 1;`

- 선언
  
  - 특정 이름에 특정 값을 설정하는 것
    
    ex) value는 이제부터 1이야
  
  - 값을 선언할 때는 2가지 종류가 있는데, 각각 변수와 상수이다.

### 변수

- 변수
  
  - 바뀔 수 있는 값. 값을 선언하고 나서 바꿀 수 있다.
  
  ```jsx
  let value = 1
  console.log(value)     // 1
  value = 2
  console.log(value)     // 2
  ```
  
  - 변수를 선언할 때는 이처럼 `let` 이라는 키워드를 사용
  
  - `주의할 점` : 한 번 선언했으면 똑같은 이름으로 선언 불가
    
    ```jsx
    let value = 1
    let value = 2     // error
    ```
    
    - 단, 다른 블록 범위 내에서는 똑같은 이름으로 사용 가능

### 상수

- 상수
  
  - 한 번 선언하고 값이 바뀌지 않음. 값이 고정적.
  
  ```jsx
  const a = 1
  a = 2             // error
  ```
  
  ```jsx
  const value = 1
  const value = 2     // error
  ```

### 데이터 타입

- 숫자 (Number)
  
  - 숫자는 바로 값을 대입하면 됨
  - `let value = 1`

- 문자열 (String)
  
  - 텍스트 형태의 값은 작은 따옴표 혹은 큰 따옴표로 감싸서 선언
  
  ```jsx
  let text = 'hello'
  let name = '자바스크립트'
  ```
  
  - 작은 따옴표와 큰 따옴표는 사용에 없어서 큰 차이는 없다.

### 참/거짓 (Boolean)

- 참 혹은 거짓 두 가지 종류의 값만을 나타낸다.

```jsx
let good = true
let loading = false
```

### null, undefined

- JavaScript에서는 ‘없음’을 의미하는 데이터 타입이 두 종류이다.

- null
  
  - 이 값이 없다! 라고 선언을 할 때 사용
  - `const friend = null`

- undefined
  
  - 아직 값이 설정되지 않은 것
  
  ```jsx
  let criminal
  console.log(criminal)      // undefined
  ```

- 즉, null은 없다고 고의적으로 설정하는 값이고 undefined는 설정을 하지 않았기 때문에 없는 값을 의미한다.

---

# 연산자

### 산술 연산자

- - : 덧셈

- - : 뺄셈

- - : 곱셈

- / : 나눗셈

- ++
  
  ```jsx
  let a = 1 
  console.log(a++)     // 1
  console.log(++a)     // 3
  
  // console.log(a++) 는 1을 더하기 직전 값을 보여줌
  // console.log(++a) 는 1을 더한 다음의 값을 보여줌
  // 뺄셈도 똑같이 작동함
  ```

### 대입 연산자

- +=
- -=
- *=
- /=

### 논리 연산자

- boolean type (true 혹은 false)를 위한 연산자

- `!` : NOT
  
  ```jsx
  const a = !true
  console.log(a)     // false
  
  const b = !false
  console.log(b)     // true
  ```

- `&&` : AND
  
  - 양쪽의 값이 둘 다 true 여야 결과물이 true
  
  ```jsx
  const a = true && true
  console.log(a)           // true
  
  // 다음 상황은 모두 false
  let f = false && false
  f = false && true
  f = true && false
  ```

- `||` : OR
  
  - 양쪽의 값 중 하나라도 true이면 결과물이 true
  - 두 값이 둘 다 false일 때만 false
  
  ```jsx
  // 다음 3가지 상황은 true
  let t = true || false
  t = false || true
  t = true || true
  
  // 다음은 false
  let f = false || false
  ```

### 연산 순서

- 논리 연산자의 순서
  
  - NOT → AND → OR 순서
  
  ```jsx
  const value = !((true && false) || (true && false) || !false);
  
  !((true && false) || (true && false) || true);
  
  !(false || false || true);
  
  !true;
  
  false;
  ```

### 비교 연산자

- `===`
  
  - 두 값이 일치하는지 확인
  
  - `==` 과 비교 ( `==` 는 타입 검사까지는 하지 않는다.)
    
    ```jsx
    const a = 1;
    const b = '1';
    const equals = a == b;
    console.log(equals);       // true
    
    const a = 0;
    const b = false;
    const equals = a == b;
    console.log(equals);       // true
    
    const a = null;
    const b = undefined;
    const equals = a == b;
    console.log(equals);       // true
    ```
  
  - 두 값이 일치하지 않는지 확인
    
    - `!==`
      
      ```jsx
      const value = 'a' !== 'b';
      console.log(value)       // true
      ```
      
      - `!=` 를 사용하게 되면 타입 검사를 하지 않음
        
        ```jsx
        console.log(1 != '1');   // false
        console.log(1 !== '1');  // true
        ```
