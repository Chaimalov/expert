import { useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { Transitions } from "../context";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { colorFromEmoji, displayDays, isInUsersList } from "../utils";
import { Loading } from "./Loading";

export const Product: React.FC = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { user } = useAuth();
  const variationsInputRef = useRef<HTMLTextAreaElement>(null);

  const saveNameVariations = async () => {
    if (!item) return;

    const variations = variationsInputRef.current?.value
      .split(",")
      .map((variation: string) => variation.trim())
      .filter((value: string) => !!value);

    if (variations) {
      api.execute(api.products.saveNameVariations(item.id, variations));
    }
  };

  const item = products.find((item) => item.name === id);

  const [color] = item ? colorFromEmoji(item?.emoji) : [];

  if (products && item) {
    return (
      <div className="center m2" style={{ "--hue": color?.toString() }}>
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
        <div className="details">
          <h3>name variations:</h3>
          <div className="chipsContainer">
            {item.nameVariation.length > 0 &&
              item.nameVariation.map((name) => (
                <Transitions key={name}>
                  <h5 className="chips">{name}</h5>
                </Transitions>
              ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveNameVariations();

              if (variationsInputRef.current) {
                variationsInputRef.current.value = "";
              }
            }}
          >
            <textarea
              ref={variationsInputRef}
              placeholder="add more comma separated variations here..."
            ></textarea>
            <button type="submit" className="btn">
              save
            </button>
          </form>
        </div>

        <div className="section">
          {isInUsersList(user, item) ? (
            <button
              className="category"
              onClick={() => {
                api.execute(api.user.removeItem(user.email, item.id));
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
                    user.email,
                    item.id,
                    item.expiryDays,
                    item.emoji
                  )
                );
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
