- React Router Tutorial 사이트
    
    [Tutorial v6.8.1](https://reactrouter.com/en/main/start/tutorial)
    
- 개요
    
    ## Client Side Routing
    
    - React Router는 “client side routing”을 가능하게 함
        - link를 클릭해서 app을 update 함
        - 서버로 다른 document를 요청하는 request를 보낼 필요가 없음
            - CSS와 JavaScript의 전체를 요청할 필요가 없기에 빠름
    - Client sider routing은 `Router` 를 만들고 `Link` 와 `<Form>` 이 있는 페이지에 linking/submitting 함으로써 활성화됨.
    
    👉 Open up your terminal and bootstrap a new React app with Vite:
    
    ```jsx
    npm create vite@latest name-of-your-project -- --template react
    
    # follow prompts
    cd <your new project directory>
    npm install react-router-dom localforage match-sorter sort-by
    npm run dev
    ```
    

# React Tutorial

### Adding a Router

- `Browser Router` 만들고 첫 번째 route로 설정하기
    - web app에서 client side routing을 가능하게 함
    - `main.jsx` 가 진입점
    
    ```jsx
    // main.jsx
    
    import React from "react";
    import ReactDOM from "react-dom/client";
    import {
      createBrowserRouter,
      RouterProvider,
    } from "react-router-dom";
    import "./index.css";
    
    const router = createBrowserRouter([
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
    ]);
    
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
    ```
    

- 이 첫 번째 route를 “root route”라고 부르기도 함.
    - 나머지 route들이 root route 내부에 렌더링되기 때문
    - UI의 루트 레이아웃 역할을 할 것
    - 더 멀어질수록 중첩된 레이아웃을 갖게 될 것

---

### The Root Route

- src/routes/root.jsx에 다음을 복사 붙여넣기 하기
    
    ```jsx
    export default function Root() {
      return (
        <>
          <div id="sidebar">
            <h1>React Router Contacts</h1>
            <div>
              <form id="search-form" role="search">
                <input
                  id="q"
                  aria-label="Search contacts"
                  placeholder="Search"
                  type="search"
                  name="q"
                />
                <div
                  id="search-spinner"
                  aria-hidden
                  hidden={true}
                />
                <div
                  className="sr-only"
                  aria-live="polite"
                ></div>
              </form>
              <form method="post">
                <button type="submit">New</button>
              </form>
            </div>
            <nav>
              <ul>
                <li>
                  <a href={`/contacts/1`}>Your Name</a>
                </li>
                <li>
                  <a href={`/contacts/2`}>Your Friend</a>
                </li>
              </ul>
            </nav>
          </div>
          <div id="detail"></div>
        </>
      );
    }
    ```
    
- main.jsx에 Root를 import 하기
    
    ```jsx
    /* existing imports */
    import Root from "./routes/root";
    
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Root />,
      },
    ]);
    
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
    ```
    

---

### Handling Not Found Errors

- App이 rendering, loading data or performing data mutations 할 때 에러가 발생하면, React Router는 이것을 catch하고 error screen을 render 함
    
    ⇒ error page를 만들어보자!
    
    ```jsx
    // src/main.jsx
    
    import { useRouteError } from "react-router-dom";
    
    export default function ErrorPage() {
        const error = useRouteError()
        console.error(error)
        
        return (
            <div id="error-page">
                <h1>Oops</h1>
                <p>Sorry, an unexpeccted error has occured.</p>
                <p>
                    <i>{ error.statusText || error.message }</i>
                </p>
            </div>
        )
    }
    ```
    

- <ErrorPage>를 root route에 errorElement로 설정하기
    
    ```jsx
    // src/main.jsx
    
    /* previous imports */
    import ErrorPage from "./error-page";
    
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
      },
    ]);
    
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
    ```
    

- useRouteError는 error를 보여줌
    
    ex) 존재하지 않는 경로로 navigate하면 Not Found라는 error response
    
- 무한로딩이나, 반응이 없는 페이지나 빈 페이지보다 error를 잘 다룰 수 있다는 걸 아는 것이 중요

---

### The Contact Route UI

- src/routes/contact.jsx
    
    ```jsx
    import { Form } from "react-router-dom";
    
    export default function Contact() {
      const contact = {
        first: "Your",
        last: "Name",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "your_handle",
        notes: "Some notes",
        favorite: true,
      };
    
      return (
        <div id="contact">
          <div>
            <img
              key={contact.avatar}
              src={contact.avatar || null}
            />
          </div>
    
          <div>
            <h1>
              {contact.first || contact.last ? (
                <>
                  {contact.first} {contact.last}
                </>
              ) : (
                <i>No Name</i>
              )}{" "}
              <Favorite contact={contact} />
            </h1>
    
            {contact.twitter && (
              <p>
                <a
                  target="_blank"
                  href={`https://twitter.com/${contact.twitter}`}
                >
                  {contact.twitter}
                </a>
              </p>
            )}
    
            {contact.notes && <p>{contact.notes}</p>}
    
            <div>
              <Form action="edit">
                <button type="submit">Edit</button>
              </Form>
              <Form
                method="post"
                action="destroy"
                onSubmit={(event) => {
                  if (
                    !confirm(
                      "Please confirm you want to delete this record."
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <button type="submit">Delete</button>
              </Form>
            </div>
          </div>
        </div>
      );
    }
    
    function Favorite({ contact }) {
      // yes, this is a `let` for later
      let favorite = contact.favorite;
      return (
        <Form method="post">
          <button
            name="favorite"
            value={favorite ? "false" : "true"}
            aria-label={
              favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {favorite ? "★" : "☆"}
          </button>
        </Form>
      );
    }
    ```
    

```jsx
// src/main.jsx

/* existing imports */
import Contact from "./routes/contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "contacts/:contactId",
    element: <Contact />,
  },
]);

/* existing code */
```

---

### Nested Routes

- Your Name, Your Friend에는 내용이 있지만 Root에는 없다
- contact route를 root route의 child로 만들어 보자
    
    ```jsx
    // src/main.jsx
    
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "contacts/:contactId",
            element: <Contact />,
          },
        ],
      },
    ]);
    ```
    

- root route에게 child routes를 render하기 원하는 위치를 알려줘야 함
    
    ⇒ `<Outlet>`
    
    ```jsx
    // src/routes/root.jsx
    
    import { Outlet } from "react-router-dom";
    
    export default function Root() {
      return (
        <>
          {/* all the other elements */}
          <div id="detail">
            <Outlet />
          </div>
        </>
      );
    }
    ```
    

---

### Client Side Routing

- 현재까지 sidebar의 link를 클릭하면 browser는 React Router를 사용하는 대신, full document request를 보냄
- Client side routing은 우리의  app이 서버에 전체 document 요청 없이 URL을 update하도록 함
    
    ⇒ `<Link>`
    
    - sidebar의 <a href>를 <Link to>로 바꿈
        
        ```jsx
        import { Outlet, Link } from "react-router-dom";
        
        export default function Root() {
          return (
            <>
              <div id="sidebar">
                {/* other elements */}
        
                <nav>
                  <ul>
                    <li>
                      <Link to={`contacts/1`}>Your Name</Link>
                    </li>
                    <li>
                      <Link to={`contacts/2`}>Your Friend</Link>
                    </li>
                  </ul>
                </nav>
        
                {/* other elements */}
              </div>
            </>
          );
        }
        ```
        

---

### Loading Data

- URL과 layouts 그리고 data는 종종 결합되지 않음
    
    ex) 
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08d3501d-bb6e-41c2-8970-f1af71a816cd/Untitled.png)
    

- React Router는 쉽게 route component로 data를 가져올 수 있도록 data conventions을 가짐
    - data를 load 하는 과정에 쓰이는 2개의 API ⇒ **loader** and **useLoaderData**
    - 처음에 root module에 loader function을 만들고 export해야 함 ⇒ 경로에 연결할 것

```jsx
// src/routes/root.jsx

import { Outlet, Link } from "react-router-dom";
import { getContacts } from "../contacts";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

// src/main.jsx

import Root, { loader as rootLoader } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
  },
]);

// src/routes/root.jsx

import {
  Outlet,
  Link,
  useLoaderData,
} from "react-router-dom";
import { getContacts } from "../contacts";

/* other code */

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        {/* other code */}

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>

        {/* other code */}
      </div>
    </>
  );
}
```

---

ㅊData Writes + HTML Forms

### Creating Contacts

- <form> 을 React Router인 <Form> 으로 바꿔보자!

---

### 용어 정리

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

- 모든 route의 root URL
    
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
    <Route-
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
    

# useRouteError

- errorElement 내부에서, 이 hook은 action, loader or rendering 동안 리턴된 무엇이든 리턴함
- 이 response는 isRouteErrorResponse 를 통해 더 많은 정보를 알 수 있음
- data router 에서만 사용할 수 있음

```jsx
function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>{error.message}</div>;
}

<Route
  errorElement={<ErrorBoundary />}
  loader={() => {
    // unexpected errors in loaders/actions
    something.that.breaks();
  }}
  action={() => {
    // stuff you throw on purpose in loaders/actions
    throw new Response("Bad Request", { status: 400 });
  }}
  element={
    // and errors thrown while rendering
    <div>{breaks.while.rendering}</div>
  }
/>;
```

# Outlet

- `<Outlet>` 은 부모 route element에 그들의 child route elements를 render 하는데 사용
    - 하위 경로가 렌더링될 때 중첩된 UI가 표시될 수 있음. 상위 경로가 정확히 일치하는 경우 하위 인덱스 경로를 렌더링하거나 인덱스 경로가 없으면 아무것도 렌더링하지 않음
    
    ```jsx
    function Dashboard() {
      return (
        <div>
          <h1>Dashboard</h1>
    
          {/* This element will render either 
    					<DashboardMessages> when the URL is "/messages", 
    					<DashboardTasks> at "/tasks", 
    					or 
    					null if it is "/"
          */}
          <Outlet />
        </div>
      );
    }
    
    function App() {
      return (
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route
              path="messages"
              element={<DashboardMessages />}
            />
            <Route path="tasks" element={<DashboardTasks />} />
          </Route>
        </Routes>
      );
    }
    ```
    
    # Form
    
    ### 👉 <Form>
    
    - Form 컴포넌트는 client side routing과 data mutations를 위해 HTML form 을 감싸는 역할
    - data router 에서만 사용 가능
    
    ```jsx
    import { Form } from "react-router-dom";
    
    function NewEvent() {
      return (
        <Form method="post" action="/events">
          <input type="text" name="title" />
          <input type="text" name="description" />
          <button type="submit">Create</button>
        </Form>
      );
    }
    ```
    
    - **주의** : input의 name이나 value에 FormData가 없게 하라!
    - 렌더링된 useNavigation hook에 대한 state update를 야기함
    - form이 navigation처럼 느껴지지 않는다면 useFetcher를 보자

### 👉 useNavigation

- data router에서만 사용 가능
    
    ```jsx
    import { useNavigation } from "react-router-dom";
    
    function SomeComponent() {
      const navigation = useNavigation();
      navigation.state;
      navigation.location;
      navigation.formData;
      navigation.formAction;
      navigation.formMethod;
    }
    ```
    

### 👉 useFetcher

- HTML/HTTP 에서, data mutation과 load는 navigation 으로 모델링됨 : <a href> 와 <form action>
- React Router에서 동일한 역할을 하는 것이 <Link>와 <Form>
    - 하지만 가끔 navigation 외부에서 loader 나 action 을 URL 변화 없이 호출하고 싶을 때 있음
    - 혹은 동시에 여러 mutations를 할 필요가 있는 경우 있음
- 서버와 많은 interactions는 navigation events가 아님
- 이 hook은 navigate 않고도 UI를 action과 loader에 연결 가능
- data router에서만 사용 가능
- 유용한 사용처
    1. UI routes와 관련 없는 데이터 fetch할 때
        - popovers, dynamic forms, etc
    2. navigating 없이 data를 actions에 보내고 싶을 때
    3. 목록에서 여러 항목을 동시에 제출하는 경우 (여러 버튼을 클릭할 수 있고 모두 동시에 보류되어야 하는 일반적인 "todo 앱" 목록)
    4. infinite scroll containers

```jsx
import { useFetcher } from "react-router-dom";

function SomeComponent() {
  const fetcher = useFetcher();

  // call submit or load in a useEffect
  React.useEffect(() => {
    fetcher.submit(data, options);
    fetcher.load(href);
  }, [fetcher]);

  // build your UI with these properties
  fetcher.state;
  fetcher.formData;
  fetcher.formMethod;
  fetcher.formAction;
  fetcher.data;

  // render a form that doesn't cause navigation
  return <fetcher.Form />;
}
```