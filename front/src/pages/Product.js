import React from 'react'
import { useLocation } from 'react-router-dom'
import { colorFromEmoji } from '../assets/color'



export default function Product() {

    const location = useLocation()
    const item = location.state

    const color = colorFromEmoji(item?.icon)

    return (

        <> {item && <div className='center m2' style={{ "--hue": color }}>
            <h1>{item.icon} {item.name}</h1>
            <h2>{item.category}</h2>
        </div>}</>
    )
}
