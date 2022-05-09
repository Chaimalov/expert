import axios from "axios"
import { useState } from "react"



function App() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")

  function sendData() {
    axios.post("http://localhost:8080/", {
      name,
      category,
    })
  }

  return (
    <div className="App">
      <form onSubmit={sendData()}>
        <label for="name">Name:</label>
        <input id="name" name="name" required value={name} onChange={e => setName(e.target.value)} />
        <label for="category">Category</label>
        <input id="category" name="category" required value={category} onChange={e => setCategory(e.target.value)} />
        <input type={"submit"}></input>
      </form>
    </div>
  );
}

export default App;
