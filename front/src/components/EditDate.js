import React, { useRef, useState } from 'react'
import { GoTriangleUp, GoTriangleDown } from "react-icons/go"

export default function EditDate({ days, value, onChange }) {
    const numberRef = useRef()
    const [number, setNumber] = useState(value)

    function updateNumber(num) {
        const current = parseInt(numberRef.current.value) + num
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
                    ref={numberRef}
                    type="number"
                    className='date'
                    value={number}
                    onChange={() => {
                        setNumber(numberRef.current.value)
                        onChange(numberRef.current.value)
                    }}
                />
                <div className='arrows'>
                    <GoTriangleUp onClick={() => {
                        setNumber(updateNumber(+1))
                        onChange(updateNumber(+1))
                    }} />
                    <GoTriangleDown onClick={() => {
                        setNumber(updateNumber(-1))
                        onChange(updateNumber(-1))
                    }} />
                </div>
            </div>
        </div>
    )
}
