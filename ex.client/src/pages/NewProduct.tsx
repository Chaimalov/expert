import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { Button, CategoriesList, CategoryButton } from "../components";
import { useAuth } from "../context/AuthContext";
import { Categories, Kind, notify, Status } from "../utils";
import { Category } from '@expert/common';

export const NewProduct: React.FC = () => {
  const saveProduct = async () => {
    if (!category || !storage) {
      notify("category and storage options are required.", Kind.ERROR);
      return;
    }

    if (!name) return;

    api.execute(
      api.products.createProduct(name, category, storage === "fridge", user.id)
    );
    goTo("/");
  };

  const [storage, setStorage] = useState<"fridge" | "pantry">();
  const [category, setCategory] = useState<Category | null>();
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
        categories={Categories}
        onClick={setCategory}
        group="category"
      />
      <h2 className="text-center">where should you store it?</h2>
      <div className="section">
        <CategoryButton
          category="fridge"
          icon="❄️"
          onClick={() => setStorage("fridge")}
          group="storage"
        />
        <CategoryButton
          category="pantry"
          icon="🧺"
          onClick={() => setStorage("pantry")}
          group="storage"
        />
      </div>
      <div className="flex m-auto">
        <Button value="add" type="submit" />
        <Button type="button" value="cancel" danger onClick={() => goTo("/")} />
      </div>
    </form>
  );
};
