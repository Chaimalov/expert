import React, { useRef, useState, forwardRef } from 'react'
import { GoTriangleUp, GoTriangleDown } from "react-icons/go"

export const EditDate = forwardRef(({ days, value }, ref) => {
    const numberRef = useRef()
    const [number, setNumber] = useState(value)

    function updateNumber(num) {
        const current = parseInt(ref.current.value) + num
        return current < 1 ? 1 : current
    }


    return (
        <div>
            <label className='date'>
                {days}
            </label>
            <div className='num-input-container'>
                <input
                    min="1"
                    ref={ref}
                    type="number"
                    className='date'
                    value={number}
                    onChange={() => {
                        setNumber(ref.current.value)
                    }}
                />
                <div className='arrows'>
                    <GoTriangleUp onClick={() => {
                        setNumber(updateNumber(+1))
                    }} />
                    <GoTriangleDown onClick={() => {
                        setNumber(updateNumber(-1))
                    }} />
                </div>
            </div>
        </div>
    )
})
