import React, { createContext, useContext, useState, useEffect } from 'react'
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import axios from "axios"

const AuthContext = createContext()
function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState()

    function addUser() {
        axios.post("/users/create", {
            id: user.uid,
            name: user.displayName,
        })
    }
    function logOut() {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            addUser()
            // alert(currentUser.email)
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ signInWithGoogle, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}