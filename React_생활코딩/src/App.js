import './App.css';
import {useState} from 'react';

function Header(props) {
  return <header>
    <h1><a href="/" onClick={event => {
      event.preventDefault()
      props.onChangeMode()
    }}>{props.title}</a></h1>
  </header>
}


function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    lis.push(<li key={props.topics[i].id}>
        {/* tag의 속성으로 숫자를 입력하면 문자가 됨 */}
        <a id={props.topics[i].id} href={"/read/" + props.topics[i].id}
          onClick={event => {
            event.preventDefault()
            // event.target은 event를 유발시킨 tag를 가리킨다
            props.onChangeMode(Number(event.target.id))
        }}>
          {props.topics[i].title}
        </a>
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
    {/* onSubmit 은 submit을 클릭했을 때 form 태그에서 발생하는 이벤트 */}
    {/* form 태그는 submit을 하면 페이지가 리로드됨 */}
    <form onSubmit={event => {
      event.preventDefault()
      // event.target은 form 태그.
      const title = event.target.title.value
      const body = event.target.body.value
      props.onCreate(title, body)
    }}>
      <p><input type="text" name="title" placeholder='title'/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}


function Update(props) {
  const [title, setTitle] = useState(props.title)
  const [body, setBody] = useState(props.body)
  return <article>
  <h2>Update</h2>
  <form onSubmit={event => {
    event.preventDefault()
    const title = event.target.title.value
    const body = event.target.body.value
    props.onUpdate(title, body)
  }}>
    <p><input type="text" name="title" placeholder='title' value={title} onChange={event => {
      setTitle(event.target.value)
    }}></input></p>
    <p><textarea name="body" placeholder='body' value={body} onChange={event => {
      setBody(event.target.value)
    }}></textarea></p>
    <p><input type="submit" value="Update" /></p>
  </form>
</article>
}


function App() {

  const [mode, setMode] = useState('WELCOME')
  const [id, setId] = useState(null)
  const [nextId, setNextId] = useState(4)

  const [topics, setTopics] = useState([
    {id: 1, title: "html", body: "html is ..."},
    {id: 2, title: "css", body: "css is ..."},
    {id: 3, title: "JavaScript", body: "JavaScript is ..."}
  ])

  let content = null
  let contextControl = null

  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB!"></Article>
  } else if (mode === 'READ') {
    let title, body = null
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id){
        title = topics[i].title
        body = topics[i].body
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
      <li><a href={"/update/" + id} onClick={event=>{
        event.preventDefault()
        setMode("UPDATE")
      }}>UPDATE</a></li>
      <li><input type="button" value="Delete" onClick={event=>{
        const newTopics = []
        for (let i = 0; i<topics.length; i++) {
          if (topics[i].id !== id) {
            newTopics.push(topics[i])
            setTopics(newTopics)
          }
          setMode('WELCOME')
        }
      }} /></li>
    </>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(title, body) => {
      const newTopic = {id: nextId, title: title, body: body}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setMode('READ')
      setId(nextId)
      setNextId(nextId + 1)
    }}></Create>
  } else if (mode === 'UPDATE') {
    let title, body = null
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id){
        title = topics[i].title
        body = topics[i].body
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const updatedTopic = {id: id, title: title, body: body}
      const newTopics = [...topics]
      for(let i=0; i<newTopics.length; i++) {
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic
        }
      }
      setTopics(newTopics)
      setMode("READ")
    }}></Update>
  }

  return (
    <div>
    <Header title="WEB" onChangeMode={() => {
      setMode('WELCOME')
    }}></Header>


    <Nav topics={topics} onChangeMode={(id)=>{
      setMode('READ')
      setId(id)
    }}></Nav>


    { content }
    <ul>
      <li>
        <a href="/create" onClick={event => {
          event.preventDefault()
          setMode('CREATE')
        }}>CREATE</a>
      </li>

      {contextControl}

    </ul>
    </div>
  );
}

export default App;
