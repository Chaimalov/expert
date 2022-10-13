import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { colorFromEmoji, isInUsersList } from "../utils";
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import { Options, EditDate } from "../components";

export function Product() {
  const [item, setItem] = useState();
  const { id } = useParams();
  const { products } = useProducts();
  const { user } = useAuth();

  useEffect(() => {
    if (!products) return;
    setItem(products.find((item) => item.name === id));
  }, [products]);

  const color = colorFromEmoji(item?.emoji);

  return (
    <>
      {item && (
        <div className="center m2" style={{ "--hue": color }}>
          <h1>
            {item.emoji} {item.name}
          </h1>
          <h2>{item.category}</h2>
          <div className="section">
            {isInUsersList(user, item) ? (
              <button
                className="category"
                onClick={() => api.user.removeItem(user.uid, item.id)}
              >
                remove item
              </button>
            ) : (
              <button
                className="category"
                onClick={() =>
                  api.user.addItem(
                    user.uid,
                    item.id,
                    item.expiryDays,
                    item.emoji
                  )
                }
              >
                add item
              </button>
            )}
            <button className="category">edit emoji</button>
            <button className="category">edit date</button>
          </div>
          <div className="container">
            <Options
              type="emoji"
              open={true}
              list={[
                ...item.emojiList.map((emoji) => ({
                  text: emoji.character,
                  action: "",
                  key: emoji.slug,
                  send: emoji.character,
                })),
                {
                  action: "",
                  key: 90,
                  send: null,
                },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
}
