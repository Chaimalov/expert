import "./App.css"
import axios from "axios"
import { useState, createRef } from "react"
import Input from "./components/Input"
import Button from "./components/Button"


function App() {
  const nameRef = createRef()
  const categoryRef = createRef()
  const searchRef = createRef()


  function sendData(e) {
    e.preventDefault()
    axios.post("http://localhost:8080/add", {
      name: nameRef.current.value,
      category: categoryRef.current.value,
    }).then(() => {
      e.target.reset()
    })
  }

  function searchItem(e) {
    e.preventDefault()
    axios.get("http://localhost:8080/search", {
      params: {
        item: searchRef.current.value,
      }
    }).then(({ data }) => {
      console.log(data)
    })
  }

  return (
    <div className="App">
      {/* <form onSubmit={e => sendData(e)}>
        <Input name="name"  ref={nameRef} />
        <Input name="category" ref={categoryRef} />
        <Button value="add" type="submit"/>
      </form> */}
      <form onSubmit={e => searchItem(e)}>
        <Input name="search" ref={searchRef} />
        <Button value="search" type="submit" />
      </form>
    </div>
  );
}

export default App;