import React, { useState, useEffect } from 'react'
import { colorFromEmoji } from "../assets/color"
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import Options from './Options';
import axios from "axios"
import { useClickOutside } from '../utils/useClickOutside';
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import EditDate from './EditDate';



export default function Item({ item, index }) {

  const [hide, setHide] = useState("")
  const [OpenEmoji, setOpenEmoji] = useState(false)
  const [OpenDate, setOpenDate] = useState(false)
  const [open, setOpen] = useState(false)
  const [icons, setIcons] = useState()
  const [emoji, setEmoji] = useState(item.icon)
  const [minDays, setMinDays] = useState(item.minDays)
  const [maxDays, setMaxDays] = useState(item.maxDays)
  const [date, setDate] = useState()

  function displayDays(days) {
    const date = calcDays(days)
    if (date.years) return date.years + (date.years > 1 ? " years" : " year")
    if (date.months) return date.months + (date.months > 1 ? " months" : " month")
    if (date.days) return date.days + (date.days > 1 ? " days" : " day")
  }

  function calcDays(date) {

    const days = parseInt(date % 30)
    const months = parseInt((date / 30) % 12)
    const years = parseInt(date / 30 / 12)
    return { days, months, years }
  }


  function handleEmoji(icon) {
    setOpenEmoji(false)
    setEmoji(icon)
    axios.post("/update/:id", {
      id: item.id,
      icon
    }).then(({ data }) => { console.log(data) })

  }

  function editEmoji() {
    setOpen(false)
    setOpenEmoji(true)
    setIcons(item.iconsList.map(icon => (
      {
        text: icon.character,
        action: handleEmoji,
        key: icon.slug,
        send: icon.character
      }
    )))
  }
  function editDate() {
    setOpen(false)
    setOpenEmoji(false)
    setOpenDate(true)
    setDate([{
      text: <EditDate days="minDays" value={minDays} onChange={setMinDays} />,
      action: null,
      key: 1,
      send: null,
    },
    {
      text: <EditDate days="maxDays" value={maxDays} onChange={setMaxDays} />,
      action: null,
      key: 2,
      send: null,
    }
    ])

  }
  function deleteItem() {
    handleClick()
    if (window.confirm(`would you like to delete ${item.name}?`)) {
      axios.post("/delete", {
        id: item.id,
      }).then(() => {
        alert("deleted")
        setHide('hide')
      })
    }
  }

  const list = [
    {
      text: <AiOutlineClose className='ion' />,
      action: handleClick,
      key: 4,
      type: "ion"
    },
    {
      text: "edit emoji",
      action: editEmoji,
      key: 1
    },
    {
      text: "edit date",
      action: editDate,
      key: 2
    },
    {
      text: "delete",
      action: deleteItem,
      key: 3,
      type: "delete"
    },
  ]

  function handleClick(state) {
    setOpen(state)
  }

  const domRef = useClickOutside(() => {
    handleClick(false)
    setOpenEmoji(false)
    setOpenDate(false)
  })


  return (
    <motion.div layout >
      <div className={'itemContainer ' + hide} ref={domRef}
        style={{ "--hue": emoji && colorFromEmoji(emoji) || 50, "--i": index }}>
        {<Options type="emoji" open={OpenEmoji} list={icons} />}
        <Options open={OpenDate} list={date} type="date" />
        <Options open={open} list={list} />
        <div className='item'>
          <div className='top'>
            {emoji && <div className='icon'>{emoji}</div>}
            <button onClick={() => handleClick(true)} className="reset">
              <IoEllipsisHorizontal className='ion' />
            </button>
          </div>
          <Link to="/product" state={{ ...item }}>
            <h2>{item.name}</h2>
          </Link>
          <h3>{item.category} </h3>
          <h4>{displayDays(minDays)} - {displayDays(maxDays)} <span>{item.refrigerator && "❄️"}</span></h4>
        </div>
      </div>
    </motion.div>
  )
}
