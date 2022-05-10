import "./App.css"
import axios from "axios"
import { useState } from "react"
import Input from "./components/Input"
import Button from "./components/Button"


function App() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")


  function sendData(e) {
    e.preventDefault()
    axios.post("http://localhost:8080/add", {
      name: name,
      category: category,
    }).then(() => {
      e.target.reset()
    })
  }

  function searchItem(e) {
    e.preventDefault()
    axios.get("http://localhost:8080/search", {
      params: {
        item: search,
      }
    })
      .then(({ data }) => {
        console.log(data)
      })
  }

  return (
    <div className="App">
      {/* <form onSubmit={e => sendData(e)}>
        <Input name="name" onChange={setName} />
        <Input name="category" onChange={setCategory} />
        <Button value="add" type="submit"/>
      </form> */}
      <form onSubmit={e => searchItem(e)}>
        <Input name="search" onChange={setSearch} />
        <Button value="search" type="submit" />
      </form>
    </div>
  );
}

export default App;
