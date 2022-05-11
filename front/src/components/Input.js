import React from 'react'

const Input = React.forwardRef(({ name, type }, ref) => (
    <>
        <label htmlFor={name}><h3>{name}:</h3></label>
        <input
            id={name}
            type={type}
            name={name}
            required
            ref={ref} />
    </>
))

export default Input

