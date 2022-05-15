import React, { useState } from 'react'
import Category from '../components/Category'
import categories from "../utils/categories"

export default function Statistics() {

    const [category, setCategory] = useState()

    return (
        <div>
            <div className="section">{categories.map(category => (
                <Category key={category.name} category={category.name} icon={category.icon} onClick={setCategory} />
            ))}
            </div>
        </div>
    )
}
