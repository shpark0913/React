# CreateBrowserRouter

### 👉 createBrowserRouter

- 모든 React Router web pjt에서 권장되는 router
- URL update와 history stack 관리에 DOM Historty API를 사용
- v6.4의 data APIs를 가능하게 함
    - loaders, actions, fetchers and more…

### 👉 Type Declaration

```jsx
function createBrowserRouter(
  routes: RouteObject[],
  opts?: {
    basename?: string;
    window?: Window;
  }
): RemixRouter;
```

### 👉 routes

- 하위 속성에 중첩된 경로가 있는 `Route` 객체의 배열
    
    ```jsx
    createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        children: [
          {
            path: "events/:id",
            element: <Event />,
            loader: eventLoader,
          },
        ],
      },
    ]);
    ```
    

### 👉 basename

- root of the domain에는 배포할 수 없지만 sub directory에는 가능한 상황에 붙인다
    
    ```jsx
    createBrowserRouter(routes, {
    	basename: "/app",
    })
    ```
    

- root에 연결할 때 /가 유지됨
    
    ```jsx
    createBrowserRouter(routes, {
      basename: "/app",
    });
    <Link to="/" />; // results in <a href="/app" />
    
    createBrowserRouter(routes, {
      basename: "/app/",
    });
    <Link to="/" />; // results in <a href="/app/" />
    ```
    

# Route

- Routes는 React Router app에서 가장 중요한 부분
- URL을 component, data loading 그리고 data mutations 에 결합함
- 중첩 라우팅을 통해 복잡한 application의 layout과 data dependencies가 간단해짐
- Routes는 router 생성 함수로 전달되는 object
    
    ```jsx
    const router = createBrowserRouter([
      {
        // it renders this element
        element: <Team />,
    
        // when the URL matches this segment
        path: "teams/:teamId",
    
        // with this data loaded before rendering
        loader: async ({ request, params }) => {
          return fetch(
            `/fake/api/teams/${params.teamId}.json`,
            { signal: request.signal }
          );
        },
    
        // performing this mutation when data is submitted to it
        action: async ({ request }) => {
          return updateFakeTeam(await request.formData());
        },
    
        // and renders this element in case something went wrong
        errorElement: <ErrorBoundary />,
      },
    ]);
    ```
    

- routes를 JSX와 `createRoutesFromElements` 와 함께 선언 가능
    - element의 props는 route objects의 properties와 동일
    
    ```jsx
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route
          element={<Team />}
          path="teams/:teamId"
          loader={async ({ params }) => {
            return fetch(
              `/fake/api/teams/${params.teamId}.json`
            );
          }}
          action={async ({ request }) => {
            return updateFakeTeam(await request.formData());
          }}
          errorElement={<ErrorBoundary />}
        />
      )
    );
    ```
    

### 👉 Path

- path pattern은 URL을 어디에 match할지 결정함
    - route를 URL에 match할지, link href에 match할지 혹은 form action에 match 할지 결정
- `Dynamic Segments` (동적 세그먼트)
    - : 으로 시작하는 path segment ⇒ dynamic segment
    - route가 URL가 match ⇒ dynamic segment가 분석되어 다른 router APIs에서 params (매개 변수)로 제공됨.
    
    ```jsx
    <Route
      // this path will match URLs like
      // - /teams/hotspur
      // - /teams/real
      path="/teams/:teamId"
      // the matching param will be available to the loader
      loader={({ params }) => {
        console.log(params.teamId); // "hotspur"
      }}
      // and the action
      action={({ params }) => {}}
      element={<Team />}
    />;
    
    // and the element through `useParams`
    function Team() {
      let params = useParams();
      console.log(params.teamId); // "hotspur"
    }
    ```
    

- 하나의 route path에서 여러 개의 dynamic segments 사용 가능
    
    ```jsx
    <Route path="/c/:categoryId/p/:productId" />;
    // both will be available
    params.categoryId;
    params.productId;
    ```
    

- Dynamic segments는 partial일 수 없다. (부분일 수 없다.)
    
    ✔ /teams/:teamId
    
    ❌ /teams-:teamId
    
    ✔ /:productSlug
    
    ❌ /:category--:productId
    

### 👉 Optional segment

- ? 를 segment 뒤에 붙여서 route segment를 optional로 만들 수 있음

```jsx
<Route
  // this path will match URLs like
  // - /categories
  // - /en/categories
  // - /fr/categories
  path="/:lang?/categories"
  // the matching param might be available to the loader
  loader={({ params }) => {
    console.log(params["lang"]); // "en"
  }}
  // and the action
  action={({ params }) => {}}
  element={<Categories />}
/>;

// and the element through `useParams`
function Categories() {
  let params = useParams();
  console.log(params.lang);
}
```

- optional static segment 역시 가능
    
    ```jsx
    <Route path="/project/task?/:taskId" />
    ```
    

### 👉 Splats

- `catchall` , `star` segments 라고도 불림
- router path pattern이 /* 으로 끝난다면
    
    ⇒ 다른 / 문자를 포함하여 / 뒤에 오는 모든 문자와 match됨
    
    ```jsx
    <Route
      // this path will match URLs like
      // - /files
      // - /files/one
      // - /files/one/two
      // - /files/one/two/three
      path="/files/*"
      // the matching param will be available to the loader
      loader={({ params }) => {
        console.log(params["*"]); // "one/two"
      }}
      // and the action
      action={({ params }) => {}}
      element={<Team />}
    />;
    
    // and the element through `useParams`
    function Team() {
      let params = useParams();
      console.log(params["*"]); // "one/two"
    }
    ```
    

- * 을 재구성할 수 있음.
    - 새 이름을 할당하기만 하면 됨. 일반적인 이름은 splat
        
        ```jsx
        let { org, "*": splat } = params;
        ```
        
    

### 👉 Layout Routes

- path를 생략 ⇒ route를 layout route로 하겠다는 의미
    - UI 중첩에 참여하지만 URL에 segment를 추가하지 않음
        
        ```jsx
        <Route
          element={
            <div>
              <h1>Layout</h1>
              <Outlet />
            </div>
          }
        >
          <Route path="/" element={<h2>Home</h2>} />
          <Route path="/about" element={<h2>About</h2>} />
        </Route>
        ```
        
        - 위의 예시에서, <h1>Layout</h1> 는 Outlet 을 통해 각 child route의 element prop과 함께 렌더링됨.
        

### 👉 index

- route가 index route인지 결정함
- Index routes는 그들의 부모 URL에서 부모의 Outlet에서 렌더링됨 (like a default child route)
    
    ```jsx
    <Route path="/teams" element={<Teams />}>
      <Route index element={<TeamsIndex />} />
      <Route path=":teamId" element={<Team />} />
    </Route>
    ```
    
- 구체적인 예시
    
    ```jsx
    <Route path="teams" element={<Teams />}>
      <Route path=":teamId" element={<Team />} />
      <Route path="new" element={<NewTeamForm />} />
      <Route index element={<LeagueStandings />} />
    </Route>
    ```
    
    - URL 이 /teams/firebirds 라면 element tree는
        
        ```jsx
        <App>
          <Teams>
            <Team />
          </Teams>
        </App>
        ```
        
    - URL이 /teams 라면 elment tree는
        
        ```jsx
        <App>
          <Teams>
            <LeagueStandings />
          </Teams>
        </App>
        ```
        

### 👉 loader

- route가 렌더링하고 useLoaderData를 통해 element에 대한 데이터를 제공하기 전에 route loader가 호출됨
    
    ```jsx
    <Route
      path="/teams/:teamId"
      loader={({ params }) => {
        return fetchTeam(params.teamId);
      }}
    />;
    
    function Team() {
      let team = useLoaderData();
      // ...
    }
    ```
    
- createBrowserRouter 과 같은 data router을 사용하지 않는다면 loader 사용 불가능
    
    

### 👉 useLoaderData

- 이 hook은 route loader의 return값을 제공함
    
    ```jsx
    <Route
      path="/teams/:teamId"
      loader={({ params }) => {
        return fetchTeam(params.teamId);
      }}
    />;
    
    function Team() {
      let team = useLoaderData();
      // ...
    }
    ```
    

### 👉 action

- route action은  Form, fetcher or submission 으로부터 정보가 제출될 때 호출됨
- createBrowserRouter과 같은 data router 에서만 동작함

```jsx
<Route
  path="/song/:songId/edit"
  element={<EditSong />}
  action={async ({ params, request }) => {
    let formData = await request.formData();
    return fakeUpdateSong(params.songId, formData);
  }}
  loader={({ params }) => {
    return fakeGetSong(params.songId);
  }}
/>
```

- actions는 non-get submission (”post”, “put”, “patch”, “delete”)가 route로 보내질 때마다 호출됨
    
    ```jsx
    // forms
    <Form method="post" action="/songs" />;
    <fetcher.Form method="put" action="/songs/123/edit" />;
    
    // imperative submissions
    let submit = useSubmit();
    submit(data, {
      method: "delete",
      action: "/songs/123",
    });
    fetcher.submit(data, {
      method: "patch",
      action: "/songs/123/edit",
    });98
    ```
    
- `params`
    - dynamic segments 는 parse되어서 action으로 전달됨
    - 무엇이 달라졌는지 확인하기에 용이
    
    ```jsx
    <Route
      path="/projects/:projectId/delete"
      action={({ params }) => {
        return fakeDeleteProject(params.projectId);
      }}
    />
    ```
    
- `request`
    - 이것은 route에서 보내지는 Fetch Request의 instance.
    - 가장 널리 쓰이는 방식은 FormData로 parse하는 것.
    
    ```jsx
    <Route
      action={async ({ request }) => {
        let formData = await request.formData();
        // ...
      }}
    />
    ```
    
    - formData의 값은 자동적으로 serialize됨. 따라서 name을 입력해야 함
        
        ```jsx
        <Form method="post">
          <input name="songTitle" />
          <textarea name="lyrics" />
          <button type="submit">Save</button>
        </Form>;
        
        // accessed by the same names
        formData.get("songTitle");
        formData.get("lyrics");
        ```
        

### 👉 element

- element는 URL에 어떤 route를 match할지 결정함

```jsx
<Route path="/for-sale" element={<Properties />} />
```

### 👉 errorElement

- 렌더링 중에 route가 예외를 낸다면 (loader, action) 보통의 element 대신 이 element가 렌더링됨
    
    ```jsx
    <Route
      path="/for-sale"
      // if this throws an error while rendering
      element={<Properties />}
      // or this while loading properties
      loader={() => loadProperties()}
      // or this while creating a property
      action={async ({ request }) =>
        createProperty(await request.formData())
      }
      // then this element will render
      errorElement={<ErrorBoundary />}
    />
    ```