import { useState, useRef } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { AiOutlineClose, AiFillPlusCircle } from "react-icons/ai";
import { Options, EditDate } from "./index";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  notify,
  types,
  useClickOutside,
  colorFromEmoji,
  isInUsersList,
} from "../utils";
import { displayDays } from "../utils";
import api from "../api/api";
import { useProducts } from "../context/ProductsContext";

export function Item({ item, mini }) {
  const [OpenEmoji, setOpenEmoji] = useState(false);
  const [OpenDate, setOpenDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [icons, setIcons] = useState();
  const [expiryDate, setExpiryDate] = useState(item.expiryDays);
  const [date, setDate] = useState();
  const { user } = useAuth();
  const { setStatus } = useProducts();
  const dateRef = useRef(expiryDate);

  const isInList = isInUsersList(user, item);

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
    // setEmoji(icon);
    api.user.updateItem(user.uid, item.id, "emoji", icon);
    setStatus(true);
  }

  function editEmoji() {
    setOpen(false);
    setOpenEmoji(true);
    setIcons([
      ...item.emojiList.map((emoji) => ({
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
      item.id,
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
            setStatus(true);
            api.user.removeItem(user.uid, item.id);
            close();
          }
        : () => {
            setStatus(true);
            api.user.addItem(user.uid, item.id, expiryDate, item.emoji);
            close();
          },
      key: 5,
      type: isInList ? "delete" : "add",
    },
    {
      text: "delete",
      action: () => {
        api.products.deleteItem(item);
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
        "--hue": (item.emoji && colorFromEmoji(item.emoji)) || 50,
      }}
    >
      {!mini && (
        <>
          <Options type="emoji" open={OpenEmoji} list={icons} />
          <Options open={OpenDate} list={date} type="date" />
          <Options open={open} list={productOptions} />
        </>
      )}
      <div className={`item  ${mini && "mini"}`}>
        <div className="top">
          {item.emoji && <div className="icon">{item.emoji}</div>}
          {!mini && (
            <button onClick={() => setOpen(true)} className="reset">
              <IoEllipsisHorizontal className="ion" />
            </button>
          )}
        </div>
        <Link to={`/product/${item.name}`} state={{ ...item }}>
          <h3>{item.name}</h3>
        </Link>
        {!mini && (
          <>
            <h4>{item.category} </h4>
            <h5 className="space-between">
              {displayDays(expiryDate)} <span>{item.refrigerator && "❄️"}</span>
            </h5>
          </>
        )}
      </div>
    </div>
  );
}
