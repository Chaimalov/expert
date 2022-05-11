import "./App.css"
import axios from "axios"
import { useState, createRef } from "react"
import Input from "./components/Input"
import Button from "./components/Button"
import Category from "./components/Category"

const categories =["fruits","vegetables","dairy","meat","pantry","wine","ice_cream"]

function App() {
  const nameRef = createRef()
  const categoryRef = createRef()
  const searchRef = createRef()


  function sendData(e) {
    e.preventDefault()
    axios.post("/add", {
      name: nameRef.current.value,
      category: categoryRef.current.value,
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
        <Input name="name"  ref={nameRef} />
        <Category category="fruits" icon= "🥲" />
        <Button value="add" type="submit"/>
      </form>
      {/* <form onSubmit={e => searchItem(e)}>
        <Input name="search" ref={searchRef} />
        <Button value="search" type="submit" />
      </form> */}
    </div>
  );
}

export default App;
