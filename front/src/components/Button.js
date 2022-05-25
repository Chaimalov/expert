import React from 'react'

export function Button({ value, danger, secondary, type, onClick }) {
    return (
        <button
            className={"btn " + (danger ? "danger" : secondary ? "secondary" : "")}
            type={type}
            onClick={onClick ? () => onClick(true) : null}
        >
            {value}</button>
    )
}
