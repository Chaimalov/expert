import React, { useState, useEffect } from 'react'
import axios from "axios"
import Category from '../components/Category'
import Item from '../components/Item'
import categories from "../utils/categories"
import { IoBasketOutline } from 'react-icons/io5';
import Transitions from '../Transition'

export default function Statistics() {

    const [category, setCategory] = useState()
    const [categoryData, setCategoryData] = useState()
    const [noData, setNoData] = useState(true)

    useEffect(() => {
        if (!category) return
        setNoData(false)
        setCategoryData()
        axios.get("/search/:category", {
            params: {
                category,
            }
        }).then(({ data }) => {
            if (data.length === 0) return setNoData(true)
            const sorted = data.sort((a, b) => {
                return a.name < b.name ? -1 : 1
            })
            setCategoryData(sorted)
        }).catch(error => {
            console.error(error)
        })
    }, [category])

    return (
        <Transitions>
            <h1>statistics</h1>
            <div className="section">{categories.map(category => (
                <Category
                    key={category.name}
                    category={category.name}
                    icon={category.icon}
                    onClick={setCategory}
                    value={category.name}
                    group="category"
                />
            ))}
            </div>
            <div className='list'>
                {categoryData ? categoryData.map((item, index) => (
                    <Item key={item.id} item={item} index={index} />
                ))
                    : noData ?
                        <div className='no-data'>
                            <h1>no data</h1>
                        </div>
                        :
                        <div className='loading'>
                            <IoBasketOutline className='loadingLogo' />loading...
                        </div>}
            </div>
        </Transitions>
    )
}
