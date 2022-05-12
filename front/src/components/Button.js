import React from 'react'

export default function Button({ value, danger, secondary, type, onClick }) {
    return (
        <button
            className={danger ? "danger" : secondary ? "secondary" : ""}
            type={type}
            onClick={onClick ? () => onClick(true) : null}
        >
            {value}</button>
    )
}
