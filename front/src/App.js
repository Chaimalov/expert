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
  { name: "ice_cream", icon: "🍧" }]

function App() {
  const nameRef = createRef()
  const searchRef = createRef()
  const [category, setCategory] = useState(false)


  function sendData(e) {
    e.preventDefault()
    axios.post("/add", {
      name: nameRef.current.value,
      category,
    }).then(() => {
      e.target.reset()
    }).catch(error => console.error(error))
  }

  function searchItem(e) {
    e.preventDefault()
    axios.get("/search", {
      params: {
        item: searchRef.current.value,
      }
    }).then(({ data }) => {
      console.log(data)
    }).catch(error => console.error(error))
  }

  return (
    <div className="App">
      <form onSubmit={e => sendData(e)}>
        <Input name="name" ref={nameRef} />
        <div className="section">{categories.map(category => (
          <Category key={category.name} category={category.name} icon={category.icon} israel ={console.log} />
        ))}
        </div>
        <Button value="add" type="submit" />
      </form>
      {/* <form onSubmit={e => searchItem(e)}>
        <Input name="search" ref={searchRef} />
        <Button value="search" type="submit" />
      </form> */}
    </div>
  );
}

export default App;
