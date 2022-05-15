import React from 'react'

export default function Item({ name, category, icon, minDays, maxDays }) {

  return (
      <div>
          <h2>name: {name}</h2>
          <div className='icon'>{icon}</div>
          <h3>category: {category} </h3>
          <h3>expiry date: { }</h3>
    </div>
  )
}
