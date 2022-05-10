import React from 'react'

export default function Input({ name, type, onChange }) {
    return (
        <>
            <label for={name}><h3>{name}:</h3></label>
            <input
                id={name}
                type={type}
                name={name}
                required
                onChange={e => onChange(e.target.value)} />
        </>
    )
}

