import React, { useState } from 'react'
import { colorFromEmoji } from "../assets/color"
import { IoEllipsisHorizontal } from 'react-icons/io5';
import axios from "axios"



export default function Item({ item, index }) {

  const [hide, setHide] = useState("")
  

  function calcExp() {
    const today = new Date()
    today.setDate(today.getDate() + ((item.minDays + item.maxDays) / 2))
    return today.toLocaleDateString("en-US")
  }

  function calcDays(days) {
    if (days > 30) return parseInt(days / 30) + " months " + ((days % 30) > 0 ? (days % 30) + " days" : "")
    return days
  }

  function handleClick() {
    if (window.confirm(`would you like to delete ${item.name}?`)) {
      axios.post("/delete", {
        id: item.id,
      }).then(() => {
        // alert("deleted")
        setHide('hide')
      })
    }
  }

  return (
    <div className={'item ' + hide} style={{ "--hue": colorFromEmoji(item.icon) || 50, "--i": index }}>
      <div className='top'>
        <div className='icon'>{item.icon}</div>
        <IoEllipsisHorizontal className='ion' onClick={handleClick} />
      </div>
      <h2>{item.name}</h2>
      <h3>{item.category} </h3>
      <h4>{calcDays(item.minDays)} - {calcDays(item.maxDays) + (item.maxDays > 30 ? "" : " days")}</h4>
      {/* <h4>exp: {calcExp()}</h4> */}
    </div>
  )
}
