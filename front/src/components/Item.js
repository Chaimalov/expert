import React from 'react'

export default function Item({ name, category, icon, minDays, maxDays }) {
  function calcExp() {
    const today = new Date()
    today.setDate(today.getDate() + ((minDays + maxDays) / 2))
    return today.toLocaleDateString("en-US")
  }

  return (
    <div className='category'>
      <h2>{name}</h2>
      <div className='icon'>{icon}</div>
      <h3>{category} </h3>
      <h3>exp: {calcExp()}</h3>
    </div>
  )
}
