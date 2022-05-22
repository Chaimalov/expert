import React from 'react'

export default function EditDate({days}) {
    return (
        <div>
            <label>
                {days}
            </label>
            <input type="number" />
        </div>
    )
}
