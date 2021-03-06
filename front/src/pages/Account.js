import React from 'react'
import { useAuth } from "../context/AuthContext"
import Transitions from '../context/Transition'

export function Account() {

    const { user } = useAuth()
    return (
        <Transitions>
            <div className='center m2'>
                <h1>Account</h1>
                <img src={user?.photoURL} alt="profile" />
                <h2>{user?.displayName}</h2>
                <h2>{user?.email}</h2>
            </div>
        </Transitions>
    )
}