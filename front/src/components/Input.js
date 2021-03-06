import { forwardRef } from 'react'

export const Input = forwardRef(({ name, type, placeholder, onChange }, ref) => (
    <div className='input'>

        <label htmlFor={name}><h3>{name}:</h3></label>
        <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder || ""}
            required
            onChange={() => onChange() || ""}
            ref={ref} />
    </div>
))



