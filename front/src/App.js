import axios from "axios"
import { useState } from "react"
import Input from "./components/Input"

function App() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")

  function sendData() {
    axios.post("http://localhost:8080/add", {
      name: name,
      category: category,
    })
  }

  return (
    <div className="App">
      <form onSubmit={e => {
        e.preventDefault()
        sendData()
        e.target.reset()
      }}>

        <Input name="name" onChange={setName} />
        <Input name="category" onChange={setCategory} />
        <input type={"submit"} />

      </form>
    </div>
  );
}

export default App;
