import React, { useState, useEffect } from 'react'
import { colorFromEmoji } from "../assets/color"
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import Options from './Options';
import axios from "axios"
import { useClickOutside } from '../utils/useClickOutside';



export default function Item({ item, index }) {

  const [hide, setHide] = useState("")
  const [openOption, setOpenOption] = useState(false)
  const [open, setOpen] = useState(false)
  const [icons, setIcons] = useState()
  const [emoji, setEmoji] = useState(item.icon)


  function calcExp() {
    const today = new Date()
    today.setDate(today.getDate() + ((item.minDays + item.maxDays) / 2))
    return today.toLocaleDateString("en-US")
  }

  function calcDays(days) {
    if (days > 30) return parseInt(days / 30) + ((days % 30) > 0 ? (days % 30) + " days" : "")
    return days
  }

  function handleEmoji(icon) {
    setOpenOption(prev => !prev)
    if (icon === item.icon) return
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
    <div ref={domRef} className={'itemContainer ' + hide} style={{ "--hue": emoji && colorFromEmoji(emoji) || 50, "--i": index }}>
      {<Options type="emoji" open={openOption} list={icons} />}
      <Options open={open} list={list} />
      <div className={'item'}>
        <div className='top'>
          {emoji && <div className='icon'>{emoji}</div>}
          <IoEllipsisHorizontal className='ion' onClick={() => handleClick(true)} />
        </div>
        <h2>{item.name}</h2>
        <h3>{item.category} </h3>
        <h4>{calcDays(item.minDays)} - {calcDays(item.maxDays) + (item.maxDays > 30 ? " months" : " days")}<span>{item.refrigerator && "❄️"}</span></h4>
        {/* <h4>exp: {calcExp()}</h4> */}
      </div>
    </div>
  )
}
