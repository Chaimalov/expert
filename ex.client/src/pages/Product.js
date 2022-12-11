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
        <div className="details">
          <h3>category: {item.category}</h3>
          <h3>lasts for: {displayDays(item.expiryDays)}</h3>
          <h3>storage: {item.refrigerator ? "refrigerate" : "dry"}</h3>
          {item.createdAt && (
            <h3>
              Date added:{" "}
              {new Date(item.createdAt).toLocaleDateString("en-us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
          )}
        </div>
        {item.nameVariation.length > 0 && (
          <div className="details">
            <h3>name variations:</h3>
            <div class="flex">
              {item.nameVariation.map((name) => (
                <h5 className="chips">{name}</h5>
              ))}
            </div>
          </div>
        )}
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
        </div>
      </div>
    );
  } else return <Loading />;
};
