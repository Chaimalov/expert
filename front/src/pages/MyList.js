import React, { useEffect, useState } from 'react'
import { useAuth } from "../context/AuthContext"
import { useProducts } from '../context/ProductsContext'
import ProductsList from "../components/ProductsList"


export default function MyList() {
    const { user } = useAuth()
    const { products } = useProducts()
    const [items, setItems] = useState()

    useEffect(() => {
        if (!user.uid || !products) return
        setItems(products.filter(item => user.itemsArray.some(list => list == item.id)))
    }, [user, products])

    if (items) return (
        <ProductsList list={items} />
    )
    return <div></div>
}
