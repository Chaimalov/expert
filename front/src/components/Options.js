import React from 'react'

export function Options({ open, list, type }) {

    return (
        <div className={'options' + (open ? " open" : "")}>
            {list && list.map(option => (
                <button
                    className={type + " " + option?.type}
                    key={option.key}
                    tabIndex={open ? "1" : "-1"}
                    onClick={option.action ? () => option.action(option.send)
                        : null}>
                    {option.text}
                </button>
            ))}
        </div>
    )
}
