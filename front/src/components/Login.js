import React, { createRef, useState, useEffect, useContext } from 'react'
import { firebase, createUserWithEmailAndPassword } from "../firebase";
import { AuthProvider, useAuth } from '../context/AuthContext';
import { GoogleButton } from "react-google-button"
import Button from "./Button"

export default function Login() {

  const { signInWithGoogle, user, logOut } = useAuth()

  async function signin() {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error(error)
    }
  }

  async function signOut() {
    try {
      await logOut()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='center'>
      {user.uid ?
        <>
          <Button value="sign out" onClick={signOut} />
        </>
        :
        <>
          <Button value="sign in with google" onClick={signin} />
          {/* <GoogleButton onClick={signin}/> */}
        </>
      }
    </div>
  );
}

