import "./App.css"
import axios from "axios"
import { useState, createRef } from "react"
import Input from "./components/Input"
import Button from "./components/Button"
import Category from "./components/Category"

const categories = [
  { name: "fruits", icon: "🍉" },
  { name: "vegetables", icon: "🥑" },
  { name: "dairy", icon: "🧀" },
  { name: "meat", icon: "🥩" },
  { name: "pantry", icon: "🥫" },
  { name: "wine", icon: "🍷" },
  { name: "ice cream", icon: "🍧" }]

function App() {
  const [name, setName] = useState("")
  const searchRef = createRef()
  const [category, setCategory] = useState()
  const [found, setFound] = useState(true)

  function sendData(e) {
    e.preventDefault()
    if (!category) return

    axios.post("/add", {
      name,
      category,
    }).then(({ data }) => {
      // e.target.reset()
      alert(data.message)
    }).catch(error => console.error(error.response.data))
  }

  function handleCancel(f) {
    setFound(f)
  }

  function searchItem(e) {
    e.preventDefault()
    axios.get("/search", {
      params: {
        item: searchRef.current.value,
      }
    }).then(({ data }) => {
      setName(searchRef.current.value)
      if (data.length == 0) return setFound(false)
      console.log(data)
    }).catch(error => {
      console.error(error)
    })
  }

  if (found) {
    return (
      <div className="App">
        <form onSubmit={e => searchItem(e)}>
          <Input name="search" ref={searchRef} />
          <Button value="search" type="submit" />
        </form>
      </div>
    )
  }
  else {
    return (
      <div className="App">
        <form onSubmit={e => sendData(e)}>
          {/* <Input name="name" ref={nameRef} /> */}
          <h2><strong>{name}</strong> is in what Category?</h2>
          <div className="section">{categories.map(category => (
            <Category key={category.name} category={category.name} icon={category.icon} onClick={setCategory} />
          ))}
          </div>
          <div>
            <Button value="add" type="submit" />
            <Button value="cancel" danger onClick={handleCancel} />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
