import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { AiOutlineClose, AiFillPlusCircle } from "react-icons/ai";
import { Options, EditDate } from "./index";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { notify, types, useClickOutside, colorFromEmoji } from "../utils";
import { displayDays } from "../utils";

export function Item({ item, index }) {
  const [OpenEmoji, setOpenEmoji] = useState(false);
  const [OpenDate, setOpenDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [icons, setIcons] = useState();
  const [emoji, setEmoji] = useState(item.emoji);
  const [expiryDate, setExpiryDate] = useState(item.expiryDays);
  const [date, setDate] = useState();
  const [inList, setInList] = useState(false);
  const { user, loggedIn } = useAuth();
  const dateRef = useRef(expiryDate)

  function addEmoji() {
    setOpenEmoji(false);
    notify("would be added", types.ERROR);
  }

  function handleEmoji(icon) {
    setOpenEmoji(false);
    setEmoji(icon)
    updateItem("emoji", icon)
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
    setOpen(false);
    setOpenEmoji(false);
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
    setOpenDate(false)
    setExpiryDate(dateRef.current.value)
    setOpen(false);
    updateItem("expiryDays", dateRef.current.value)
  }

  function deleteItem() {
    setOpen(false);
    if (window.confirm(`would you like to delete ${item.name}?`)) {
      axios
        .post("/products/delete", {
          id: item.id,
        })
        .then(({ data }) => {
          notify(data, types.SUCCESS);
        });
    }
  }
  function updateItem(key, value) {
    axios
      .post("/users/updateItem", {
        userId: user.uid,
        item: item.id,
        key,
        value
      })
      .then(({ data }) => {
        notify(data, types.SUCCESS);
      });
  }

  function addItem() {
    axios
      .post("/users/addItem", {
        userId: user.uid,
        item: item.id,
        days: expiryDate,
        emoji: emoji,
      })
      .then(({ data }) => {
        notify(data, types.SUCCESS);
      });
  }

  function removeItem() {
    axios
      .post("/users/removeItem", {
        userId: user.uid,
        item: item.id,
      })
      .then(({ data }) => {
        notify(data, types.SUCCESS);
      });
  }

  useEffect(() => {
    if (!loggedIn || !user.itemsArray) return;
    setInList(Object.keys(user.itemsArray).some((id) => id === item.id));
    // console.log(user.itemsArray)
  }, [user.itemsArray]);

  const list = [
    {
      text: <AiOutlineClose className="ion" />,
      action: () => setOpen(false),
      key: 4,
      type: "ion",
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
      text: inList ? "remove item" : "add item",
      action: inList ? removeItem : addItem,
      key: 5,
      type: inList ? "delete" : "add",
    },
    {
      text: "delete",
      action: deleteItem,
      key: 3,
      type: "delete",
    },
  ];

  const domRef = useClickOutside(() => {
    setOpen(false);
    setOpenEmoji(false);
    setOpenDate(false);
  });

  return (
    <motion.div layout transition={{ ease: "anticipate" }} >
      <div
        className="itemContainer"
        ref={domRef}
        style={{
          "--hue": (emoji && colorFromEmoji(emoji)) || 50,
          "--i": index,
        }}
      >
        {<Options type="emoji" open={OpenEmoji} list={icons} />}
        <Options open={OpenDate} list={date} type="date" />
        <Options open={open} list={list} />
        <div className="item">
          <div className="top">
            {emoji && <div className="icon">{emoji}</div>}
            <button onClick={() => setOpen(true)} className="reset">
              <IoEllipsisHorizontal className="ion" />
            </button>
          </div>
          <Link to={`/product/${item.name}`} state={{ ...item }}>
            <h2>{item.name}</h2>
          </Link>
          <h3>{item.category} </h3>
          <h4>
            {displayDays(expiryDate)}{" "}
            <span>{item.refrigerator && "??????"}</span>
          </h4>
        </div>
      </div>
    </motion.div>
  );
}
