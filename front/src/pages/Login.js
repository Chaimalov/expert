import React, { createRef, useState, useEffect, useContext } from 'react'
import { firebase, createUserWithEmailAndPassword } from "../firebase";
import Transition from '../Transition';
import { AuthProvider, useAuth} from '../context/AuthContext';
import {GoogleButton} from "react-google-button"
import Button from "../components/Button"

export default function Login() {

  const {signInWithGoogle, user, logOut} = useAuth()

  async function signin(){
    try{
      await signInWithGoogle()
    }catch(error){

    }
  }

    return (
      <Transition>
        <div className='center'>
          <h1>sign-in</h1>
          {user ? 
          <>
            <Button value="log Out" onClick={logOut}/>
          </>
          :
          <>
            <h2>Please sign-in:</h2>
            <GoogleButton onClick={signin}/>
          </>
          }
        </div>
      </Transition>
    );
  }

