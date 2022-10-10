import axios from "axios";
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

export function Home() {
  const [name, setName] = useState("");
  const searchRef = createRef();
  const [category, setCategory] = useState();
  const [found, setFound] = useState(true);
  const [refrigerator, setRefrigerator] = useState(null);
  const [filteredList, setFilteredList] = useState();

  const { user, loggedIn } = useAuth();
  const { products } = useProducts();

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

  function sendData(e) {
    e.preventDefault();
    if (!category || refrigerator === null) return;
    const toastId = toast.loading("sending data...");
    axios
      .post("/products/add", {
        name: name.toLowerCase().trim(),
        category,
        refrigerator,
      })
      .then(({ data }) => {
        e.target.reset();
        notify(data.message, types.SUCCESS);
        setFound(true);
      })
      .catch((error) => notify(error.response.data, types.ERROR))
      .finally(() => toast.dismiss(toastId));
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
        <h1>expert</h1>
        <h2>expiry dates by the experts</h2>
      </header>
      {found ? (
        <>
          <form onSubmit={(e) => searchItem(e)} className="search">
            <Input
              type="search"
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
  );
}
