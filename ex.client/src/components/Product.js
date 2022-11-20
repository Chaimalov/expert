import { useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlineClose } from "react-icons/ai";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import {
  colorFromEmoji,
  displayDays,
  isInUsersList,
  notify,
  types,
  useClickOutside,
} from "../utils";
import { EditDate, Options } from "./index";

export function Product({ product, mini }) {
  const [OpenEmoji, setOpenEmoji] = useState(false);
  const [OpenDate, setOpenDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [icons, setIcons] = useState();
  const [expiryDate, setExpiryDate] = useState(product.expiryDays);
  const [date, setDate] = useState();
  const { user } = useAuth();
  const { setStatus } = useProducts();
  const dateRef = useRef(expiryDate);

  const isInList = isInUsersList(user, product);

  function addEmoji() {
    setOpenEmoji(false);
    notify("would be added", types.ERROR);
  }

  const close = () => {
    setOpen(false);
    setOpenEmoji(false);
    setOpenDate(false);
  };

  async function handleEmoji(icon) {
    setOpenEmoji(false);
    api.user.updateItem(user.uid, product.id, "emoji", icon);
    setStatus(true);
  }

  function editEmoji() {
    setOpen(false);
    setOpenEmoji(true);
    setIcons([
      ...product.emojiList.map((emoji) => ({
        text: emoji.character,
        action: handleEmoji,
        key: emoji.slug,
        send: emoji.character,
      })),
      {
        text: <AiFillPlusCircle />,
        action: addEmoji,
        key: 90,
        send: null,
      },
    ]);
  }

  function editDate() {
    close();
    setOpenDate(true);
    setDate([
      {
        text: <EditDate days="expiry date" value={expiryDate} ref={dateRef} />,
        action: null,
        key: 1,
        send: null,
      },
      {
        text: "save",
        action: () => saveDate(),
        key: 2,
      },
    ]);
  }

  function saveDate() {
    setExpiryDate(dateRef.current.value);
    api.user.updateItem(
      user.uid,
      product.id,
      "expiryDays",
      Number(dateRef.current.value)
    );
    setStatus(true);
    close();
  }

  const productOptions = [
    {
      text: <AiOutlineClose className="ion" />,
      action: () => setOpen(false),
      type: "ion",
      key: 4,
    },
    {
      text: "edit emoji",
      action: editEmoji,
      key: 1,
    },
    {
      text: "edit date",
      action: editDate,
      key: 2,
    },
    {
      text: isInList ? "remove item" : "add item",
      action: isInList
        ? () => {
            api.user.removeItem(user.uid, product.id);
            setStatus(true);
            close();
          }
        : () => {
            api.user.addItem(user.uid, product.id, expiryDate, product.emoji);
            setStatus(true);
            close();
          },
      key: 5,
      type: isInList ? "delete" : "add",
    },
    {
      text: "delete",
      action: () => {
        api.products.deleteItem(product);
        setStatus(true);
      },
      key: 3,
      type: "delete",
    },
  ];

  const domRef = useClickOutside(close);

  return (
    <div
      className="itemContainer"
      ref={domRef}
      style={{
        "--hue": (product.emoji && colorFromEmoji(product.emoji)) || 50,
      }}
    >
      {!mini && (
        <>
          <Options type="emoji" open={OpenEmoji} list={icons} />
          <Options open={OpenDate} list={date} type="date" />
          <Options
            open={open}
            list={user.isAdmin ? productOptions : productOptions.splice(0, 4)}
          />
        </>
      )}
      <div className={`item ${mini ? "mini" : ""}`}>
        <div className="top">
          {product.emoji && <div className="icon">{product.emoji}</div>}
          {!mini && (
            <button onClick={() => setOpen(true)} className="reset">
              <IoEllipsisHorizontal className="ion" />
            </button>
          )}
        </div>
        <Link to={`/product/${product.name}`} state={{ ...product }}>
          <h3>{product.name}</h3>
        </Link>
        {!mini && (
          <>
            <h4>{product.category} </h4>
            <h5 className="space-between">
              {displayDays(expiryDate)}{" "}
              <span>{product.refrigerator && "❄️"}</span>
            </h5>
          </>
        )}
      </div>
    </div>
  );
}
