import React, { useState } from 'react'
import { colorFromEmoji } from "../assets/color"
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import Options from './Options';
import axios from "axios"



export default function Item({ item, index }) {

  const [hide, setHide] = useState("")
  const [open, setOpen] = useState(false)


  function calcExp() {
    const today = new Date()
    today.setDate(today.getDate() + ((item.minDays + item.maxDays) / 2))
    return today.toLocaleDateString("en-US")
  }

  function calcDays(days) {
    if (days > 30) return parseInt(days / 30) + " months " + ((days % 30) > 0 ? (days % 30) + " days" : "")
    return days
  }

  function editEmoji() {

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

  function handleClick() {
    setOpen(prev => !prev)
  }

  return (
    <div className='itemContainer'>
      <Options open={open} list={list} />
      <div className={'item ' + hide} style={{ "--hue": colorFromEmoji(item.icon) || 50, "--i": index }}>
        <div className='top'>
          <div className='icon'>{item.icon}</div>
          <IoEllipsisHorizontal className='ion' onClick={handleClick} />
        </div>
        <h2>{item.name}</h2>
        <h3>{item.category} </h3>
        <h4>{calcDays(item.minDays)} - {calcDays(item.maxDays) + (item.maxDays > 30 ? "" : " days")}<span>{item.refrigerator && "❄️"}</span></h4>
        {/* <h4>exp: {calcExp()}</h4> */}
      </div>
    </div>
  )
}
