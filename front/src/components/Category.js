import React from 'react'

export default function Category({category,icon}) {
  return (
      <div class="category">
          <div class="icon">{icon}</div>
          <div>
              <h2>{category}</h2>
          </div>
      </div>
  )
}
