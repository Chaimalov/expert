import React, { useEffect } from 'react'
import { emoji_rgba } from "../assets/color"

export default function Category({ category, icon }) {
    const color = emoji_rgba(icon)[0]
    return (
        <button className="category" style={{ "--hue": color }}>
            <div className="icon">{icon}</div>
            <div>
                <h2>{category}</h2>
            </div>
        </button>
    )
}
