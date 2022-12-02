import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { colorFromEmoji, displayDays, isInUsersList } from "../utils";
import { Loading } from "./Loading";

export const Product = () => {
  const [item, setItem] = useState();
  const { id } = useParams();
  const { products, setStatus } = useProducts();
  const { user } = useAuth();

  useEffect(() => {
    if (!products) return;
    setItem(products.find((item) => item.name === id));
  }, [products, id]);

  const color = colorFromEmoji(item?.emoji);
  if (products && item) {
    return (
      <div className="center m2" style={{ "--hue": color }}>
        <h1>
          {item.emoji} {item.name}
        </h1>
        <h2>{item.category}</h2>
        <h3>{displayDays(item.expiryDays)}</h3>
        <div className="section">
          {isInUsersList(user, item) ? (
            <button
              className="category"
              onClick={() => {
                api.execute(api.user.removeItem(user.uid, item.id));
                setStatus(true);
              }}
            >
              remove item
            </button>
          ) : (
            <button
              className="category"
              onClick={() => {
                api.execute(
                  api.user.addItem(
                    user.uid,
                    item.id,
                    item.expiryDays,
                    item.emoji
                  )
                );
                setStatus(true);
              }}
            >
              add item
            </button>
          )}
          <button className="category">edit date</button>
        </div>
      </div>
    );
  } else return <Loading />;
};
