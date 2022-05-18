import React from 'react'
import { useAuth } from "../context/AuthContext"


export default function Account() {

    const { user } = useAuth()
    console.log(user)
    return (
        <div className='center'>
            <h1>Account</h1>
            <img src={user.photoURL} alt="profile" />
            <h2>{user.displayName}</h2>
            <h2>{user.email}</h2>
        </div>
    )
}
