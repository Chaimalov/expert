import axios from "axios"
import { useState } from "react"

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
        e.reset()
      }}>
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          required value={name}
          onChange={e => setName(e.target.value)} />

        <label for="category">Category</label>
        <input
          id="category"
          type="text"
          name="category"
          required value={category}
          onChange={e => setCategory(e.target.value)} />
        <input type={"submit"} />

      </form>
    </div>
  );
}

export default App;
