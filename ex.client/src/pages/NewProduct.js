import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { Button, CategoriesList, Category } from "../components";
import { useAuth } from "../context/AuthContext";
import { categories, notify, types } from "../utils";

export default function NewProduct() {
  const saveProduct = async () => {
    if (!category || storage === null) {
      notify("category and storage options are required.", types.ERROR);
      return;
    }

    api.execute(api.products.createProduct(name, category, storage, user.id));
    goTo("/");
  };

  const [storage, setStorage] = useState(null);
  const [category, setCategory] = useState();
  const { name } = useParams();
  const { user } = useAuth();

  const goTo = useNavigate();

  return (
    <form
      className="center m2 text-center"
      onSubmit={(e) => {
        e.preventDefault();
        saveProduct();
      }}
    >
      <header />
      <h2 className="text-center">
        <strong>{name}</strong> is in what Category?
      </h2>
      <CategoriesList
        categories={categories}
        onClick={setCategory}
        group="category"
      />
      <h2 className="text-center">where should you store it?</h2>
      <div className="section">
        <Category
          category="fridge"
          icon="❄️"
          onClick={setStorage}
          value={true}
          group="storage"
        />
        <Category
          category="pantry"
          icon="🧺"
          onClick={setStorage}
          value={false}
          group="storage"
        />
      </div>
      <div className="flex m-auto">
        <Button value="add" type="submit" />
        <Button type="button" value="cancel" danger onClick={() => goTo("/")} />
      </div>
    </form>
  );
}
