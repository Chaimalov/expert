import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { colorFromEmoji } from '../utils/color'
import { useProducts } from "../context/ProductsContext";

export function Product() {

    const [item, setItem] = useState()
    const { id } = useParams()
    const { products } = useProducts()

    useEffect(() => {
        if (!products) return
        setItem(products.find(item => item.name === id))
    }, [products])


    const color = colorFromEmoji(item?.icon)

    return (

        <>
            {item && <div className='center m2' style={{ "--hue": color }}>
                <h1>{item.icon} {item.name}</h1>
                <h2>{item.category}</h2>
            </div>}
        </>
    )
}
