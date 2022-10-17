import { useState, createRef, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { useProducts } from "../context/ProductsContext";
import toast from "react-hot-toast";
import { notify, types, categories } from "../utils";
import {
  Category,
  CategoriesList,
  ProductsList,
  Button,
  Input,
} from "../components";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

export function Home() {
  const [name, setName] = useState("");
  const searchRef = createRef();
  const [category, setCategory] = useState();
  const [found, setFound] = useState(true);
  const [refrigerator, setRefrigerator] = useState(null);
  const [filteredList, setFilteredList] = useState();

  const { user, loggedIn } = useAuth();
  const { products, setStatus } = useProducts();

  useEffect(() => {
    if (!products) return;
    setFilteredList(products);
  }, [products, found, user]);

  function filterList() {
    setFilteredList(() => {
      return products.filter(
        (item) => item.name.indexOf(searchRef.current.value) !== -1
      );
    });
  }

  async function sendData(e) {
    e.preventDefault();
    if (!category || refrigerator === null) return;

    setStatus(true);
    await api.products.createProduct(name, category, refrigerator);
    e.target.reset();
    setFound(true);
  }

  function handleCancel(f) {
    setFound(f);
  }

  function searchItem(e) {
    e.preventDefault();
    setName(searchRef.current.value);
    setFound(
      products.find((item) => item.name === searchRef.current.value) !==
        undefined
    );
  }

  return (
    <div className="App">
      <header>
        <h1>this is expert</h1>
        <h3>expiry dates by the experts</h3>
      </header>
      {found ? (
        <>
          <form onSubmit={(e) => searchItem(e)} className="search">
            <Input
              type="search"
              name="search"
              ref={searchRef}
              placeholder="search for an item"
              onChange={() => filterList()}
            />
            <Button value={<BiSearchAlt2 />} type="submit" />
          </form>
          <ProductsList list={filteredList} />
        </>
      ) : (
        <form onSubmit={(e) => sendData(e)}>
          <h2 className="text-center">
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
          <div className="flex m-auto">
            <Button value="add" type="submit" />
            <Button value="cancel" danger onClick={handleCancel} />
          </div>
        </form>
      )}
    </div>
  );
}
