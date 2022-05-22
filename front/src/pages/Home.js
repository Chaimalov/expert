import axios from "axios";
import { useState, createRef, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Category from "../components/Category";
import categories from "../utils/categories";
import { BiSearchAlt2 } from "react-icons/bi";
import Transitions from "../Transition";
import ProductsList from "../components/ProductsList";
import CategoriesList from "../components/CategoriesList";
import { useProducts } from "../context/ProductsContext";

function Home() {
  const [name, setName] = useState("");
  const searchRef = createRef();
  const [category, setCategory] = useState();
  const [found, setFound] = useState(true);
  const [refrigerator, setRefrigerator] = useState(null);
  const [filteredList, setFilteredList] = useState();

  const { products } = useProducts();

  useEffect(() => {
    if (!products) return;
    setFilteredList(products);
  }, [products, found]);

  function filterList() {
    setFilteredList(() => {
      return products.filter(
        (item) => item.name.indexOf(searchRef.current.value) !== -1
      );
    });
  }

  function sendData(e) {
    e.preventDefault();
    if (!category || refrigerator === null) return;

    axios
      .post("/add", {
        name,
        category,
        refrigerator,
      })
      .then(({ data }) => {
        e.target.reset();
        alert(data.message);
        setFound(true);
      })
      .catch((error) => console.error(error.response.data));
  }

  function handleCancel(f) {
    setFound(f);
  }

  function searchItem(e) {
    e.preventDefault();
    setName(searchRef.current.value)
    setFound(products.find(item => item.name === searchRef.current.value) !== undefined)
  }

  return (
    <Transitions>
      <div className="App">
        <header>
          <h1>expert</h1>
          <h2>expiry dates by the experts</h2>
        </header>
        {found ? (
          <>
            <form onSubmit={(e) => searchItem(e)} className="search">
              <Input
                name="search"
                ref={searchRef}
                placeholder="search for an item"
                onChange={filterList}
              />
              <Button value={<BiSearchAlt2 />} type="submit" />
            </form>
            <ProductsList list={filteredList} />
          </>
        ) : (
          <form onSubmit={(e) => sendData(e)}>
            <h2>
              <strong>{name}</strong> is in what Category?
            </h2>
            <CategoriesList
              categories={categories}
              onClick={setCategory}
              group="category"
            />
            <div className="section">
              <Category
                category="refrigerator"
                icon="❄️"
                onClick={setRefrigerator}
                value={true}
                group="refrigerator"
              />
              <Category
                category="noRefrigerator"
                icon="🧺"
                onClick={setRefrigerator}
                value={false}
                group="refrigerator"
              />
            </div>
            <div>
              <Button value="add" type="submit" />
              <Button value="cancel" danger onClick={handleCancel} />
            </div>
          </form>
        )}
      </div>
    </Transitions>
  );
}

export default Home;
