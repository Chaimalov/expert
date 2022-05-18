import React from 'react'

export default function Options({ open, list }) {

    return (
        <div className={'options' + (open ? " open" : "")}>
            {list && list.map(option => (
                <button key={option.key} onClick={() => option.action()}>{option.text}</button>
            ))}
        </div>
    )
}
