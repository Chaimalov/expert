import axios from "axios"
import { useState, createRef } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import Category from "../components/Category"
import Item from "../components/Item"
import categories from "../utils/categories"
import { BiSearchAlt2 } from "react-icons/bi"
import Transitions from "../Transition"


function Home() {
    const [name, setName] = useState("")
    const searchRef = createRef()
    const [category, setCategory] = useState()
    const [found, setFound] = useState(true)
    const [item, setItem] = useState()
    const [refrigerator, setRefrigerator] = useState(null)

    function sendData(e) {
        e.preventDefault()
        if (!category || refrigerator === null) return

        axios.post("/add", {
            name,
            category,
            refrigerator,
        }).then(({ data }) => {
            // e.target.reset()
            alert(data.message)
            setFound(true)
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

    return (
        <Transitions>
            <div className="App">
                <header>
                    <h1>expert</h1>
                    <h2>expiry dates by the experts</h2>
                </header>
                {found ?
                    <form onSubmit={e => searchItem(e)} className="search">
                        <Input name="search" ref={searchRef} placeholder="search for an item" />
                        <Button value={<BiSearchAlt2 />} type="submit" />
                    </form>
                    :
                    <form onSubmit={e => sendData(e)}>
                        {/* <Input name="name" ref={nameRef} /> */}
                        <h2><strong>{name}</strong> is in what Category?</h2>
                        <div className="section">{categories.map(category => (
                            <Category key={category.name} category={category.name} icon={category.icon} onClick={setCategory} value={category.name} group="category" />
                        ))}
                        </div>
                        <div className="section">
                            <Category
                                category="refrigerator"
                                icon="❄️"
                                onClick={setRefrigerator}
                                value={true}
                                group="refrigerator" />
                            <Category
                                category="noRefrigerator"
                                icon="🧺"
                                onClick={setRefrigerator}
                                value={false}
                                group="refrigerator" />
                        </div>
                        <div>
                            <Button value="add" type="submit" />
                            <Button value="cancel" danger onClick={handleCancel} />
                        </div>
                    </form>
                }
                {item && found &&
                    <div className="list">
                        <Item
                            name={item.name}
                            category={item.category}
                            icon={item.icon}
                            minDays={item.minDays}
                            maxDays={item.maxDays}
                            id={item.id}
                        />
                    </div>}
            </div>
        </Transitions>
    );

}

export default Home;
