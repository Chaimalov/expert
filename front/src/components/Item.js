import React, { useState, useEffect } from 'react'
import { colorFromEmoji } from "../assets/color"
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import Options from './Options';
import axios from "axios"
import { useClickOutside } from '../utils/useClickOutside';
import { Link } from "react-router-dom"
import { motion } from "framer-motion"



export default function Item({ item, index }) {

  const [hide, setHide] = useState("")
  const [openOption, setOpenOption] = useState(false)
  const [open, setOpen] = useState(false)
  const [icons, setIcons] = useState()
  const [emoji, setEmoji] = useState(item.icon)
  const [minDays, set] = useState(item.icon)



  function calcExp() {
    const today = new Date()
    today.setDate(today.getDate() + ((item.minDays + item.maxDays) / 2))
    return today.toLocaleDateString("en-US")
  }

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
    setOpenOption(false)
    setEmoji(icon)
    axios.post("/update/:id", {
      id: item.id,
      icon
    }).then(({ data }) => { console.log(data) })

  }

  function editEmoji() {
    setOpen(false)
    setOpenOption(true)
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
    setOpenOption(true)

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
      key: 4
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
      key: 3
    },
  ]

  function handleClick(state) {
    setOpen(state)
  }

  const domRef = useClickOutside(() => {
    handleClick(false)
    setOpenOption(false)
  })


  return (
    <motion.div layout >
      <div className={'itemContainer ' + hide} ref={domRef}
        style={{ "--hue": emoji && colorFromEmoji(emoji) || 50, "--i": index }}>
        {<Options type="emoji" open={openOption} list={icons} />}
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
          <h4>{displayDays((item.minDays + item.maxDays) / 2)}<span>{item.refrigerator && "❄️"}</span></h4>
          {/* <h4>exp: {calcExp()}</h4> */}
        </div>
      </div>
    </motion.div>
  )
}
