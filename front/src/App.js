import "./App.css"
import axios from "axios"
import { useState } from "react"
import Input from "./components/Input"
import Submit from "./components/Submit"

function App() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")

  function sendData(e) {
    e.preventDefault()
    axios.post("http://localhost:8080/add", {
      name: name,
      category: category,
    }).then(() => {
      e.target.reset()
    })
  }

  return (
    <div className="App">
      <form onSubmit={e => sendData(e)}>
        <Input name="name" onChange={setName} />
        <Input name="category" onChange={setCategory} />
        <Submit />
      </form>
    </div>
  );
}

export default App;
