import React, { createContext, useContext, useState, useEffect } from 'react'
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()
function signInWithGoogle(){
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
}

export function AuthProvider({ children }) {

    function logOut(){
        signOut(auth)
    }

    const [user, setUser] = useState()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            // alert(currentUser.email)
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={{signInWithGoogle, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}