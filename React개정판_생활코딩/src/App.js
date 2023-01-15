import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import './App.css';
import { useState } from 'react';

function Header(props) {
  return <header>
  <h1><a href="/" onClick={(event) => {
    event.preventDefault()
    props.onChangeMode()
  }}>{props.title}</a></h1>
</header>
}


function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let element = props.topics[i];
    lis.push(<li key={element.id}>
      <a id={element.id} href={"/read/" + element.id} onClick={(event) => {
      event.preventDefault()
      // props.onChangeMode(element.id)

      // element.id는 숫자였지만 태그의 속성으로 넘기면 걔는 문자가 된다!!!
      props.onChangeMode(Number(event.target.id))
      // target은 이벤트를 유발시키는 태그를 가리킴!! => 여기서는 a Tag
      // a Tag의 id를 가져오고 싶으니 event.target.id !!

    }}>{element.title}</a>
    </li>)
  }
  return <nav>
  <ol>
    {lis}
  </ol>
</nav>
}


function Article(props) {
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}


function Create(props) {
  return <article>
    <h2>Create</h2>

    {/* onSubmit은 submit버튼을 클릭했을 때 form 태그에서 발생하는 event  */}
    {/* event.target 은 event가 발생한 tag를 가리킴 */}
    <form onSubmit={event => {
      event.preventDefault()
      const title = event.target.title.value
      const body = event.target.body.value
      props.onCreate(title, body)
    }}>
      <p><input type="text" name="title" placeholder='title'></input></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <input type="submit" value="Create"></input>
    </form>
  </article>
}


function App() {

  // 0번째 원소는 상태의 값을 읽을 때 쓰는 데이터
  // 1번째 원소는 그 상태를 변경할 때 사용하는 함수
  // useState의 인자는 그 state의 초기값
  // state의 값은 0번째 인덱스, 바꿀 때는 1번째 인덱스의 함수로 바꿈
  // const _mode = useState('WELCOME')
  // const mode = _mode[0]
  // const setMode = _mode[1]
  const [mode, setMode] = useState('WELCOME')

  const [id, setId] = useState(null)
  const [nextId, setNextId] = useState(4)
  const [topics, setTopics] = useState([
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'css', body: 'css is ...'},
    {id: 3, title: 'javascript', body: 'javascript is ...'},
  ])

  let content = null

  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB!"></Article>
  } else if(mode === 'READ'){
    let title, body = null
    for (let i = 0; i < topics.length; i++) {
      if (id === topics[i].id) {
        title = topics[i].title
        body = topics[i].body
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {id: nextId, title: _title, body: _body}
      const newTopics = [...topics]
      newTopics.push(newTopic) 
      setTopics(newTopics)
      setMode('READ')
      setId(nextId)
      setNextId(nextId + 1)
    }}></Create>
  }


  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME')
      }}></Header>

      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ')
        setId(_id)
      }}></Nav>
      
      {content} <br />

      <a href="/create" onClick={event => {
        event.preventDefault()
        setMode('CREATE')
      }}>Create</a>

    </div>
  );
}

export default App;
