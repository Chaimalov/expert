import React from 'react'

export default function Options({ open, list, type }) {

    return (
        <div className={'options' + (open ? " open" : "")}>
            {list && list.map(option => (
                <button className={type} key={option.key} onClick={() => option.action(option.send)}>{option.text}</button>
            ))}
        </div>
    )
}
