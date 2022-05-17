import React, { createContext, useContext, useState, useEffect } from 'react'
import { firebase } from "../firebase"


export const AuthContext = createContext()
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    function signup() {
        return "hello"
    }
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const value = {
        test: "hello",
        // currentUser,
        // signup
    }

    return (
        <AuthContext.Provider value="hello">
            {children}
        </AuthContext.Provider>
    )
}
