import React from 'react'

const Input = React.forwardRef(({ name, type, placeholder, onChange }, ref) => (
    <div className='input'>

        <label htmlFor={name}><h3>{name}:</h3></label>
        <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder || ""}
            required
            onChange={() => onChange(null) || ""}
            ref={ref} />
    </div>
))

export default Input

