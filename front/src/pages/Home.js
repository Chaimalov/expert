import axios from "axios"
import { useState, createRef } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import Category from "../components/Category"
import Item from "../components/Item"
import categories from "../utils/categories"


function Home() {
    const [name, setName] = useState("")
    const searchRef = createRef()
    const [category, setCategory] = useState()
    const [found, setFound] = useState(true)
    const [item, setItem] = useState()

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
            setItem(data[0])
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
                {item && <Item name={item.name} category={item.category} icon={item.icon} minDays={item.minDays} maxDays={item.maxDays} />}
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

export default Home;
