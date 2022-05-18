import React from 'react'
import { useLocation } from 'react-router-dom'



export default function Product() {

    const location = useLocation()
    const item = location.state

    return (
        <div className='center'>
            <h1>Product</h1>
            <h2>{item?.name}</h2>
            <h2>{item?.icon}</h2>
            <h2>{item?.category}</h2>
        </div>
    )
}
