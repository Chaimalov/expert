import React from 'react'

export default function Button({ value, danger, secondary, type }) {
    return (
        <button
            className={danger ? "danger" : secondary ? "secondary" : ""}
            type={type}
        >
            {value}</button>
    )
}
