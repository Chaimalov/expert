import React from 'react'
import { colorFromEmoji } from "../assets/color"
import { IoEllipsisHorizontal } from 'react-icons/io5';
import axios from "axios"


export default function Item({ name, category, icon, minDays, maxDays, id, index }) {
  function calcExp() {
    const today = new Date()
    today.setDate(today.getDate() + ((minDays + maxDays) / 2))
    return today.toLocaleDateString("en-US")
  }

  function handleClick() {
    if (window.confirm(`would you like to delete ${name}?`)) {
      axios.post("/delete", {
        id,
      }).then(() => {
        alert("deleted")
      })
    }
  }

  return (
    <div className='item' style={{ "--hue": colorFromEmoji(icon) || 50, "--i": index }}>
      <div className='top'>
        <div className='icon'>{icon}</div>
        <IoEllipsisHorizontal className='ion' onClick={handleClick} />
      </div>
      <h2>{name}</h2>
      <h3>{category} </h3>
      <h4>exp: {calcExp()}</h4>
    </div>
  )
}
