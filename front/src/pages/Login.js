import React, { createRef } from 'react'
import { auth, createUserWithEmailAndPassword } from "../firebase";
import Input from "../components/Input"
import Button from '../components/Button';


function signUp(emailRef, passRef) {

  createUserWithEmailAndPassword(auth, emailRef, passRef)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
    
     console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
export default function Login() {
  const emailRef = createRef()
  const passRef = createRef()

  return (
    <div>
      {/* <form onSubmit={e => e.target.preventDefault()}> */}
        <Input name="email" type="email" ref={emailRef}/>
        <Input name="password" type="password" ref={passRef}/>
        <Button value={"sign up"} type="submit" onClick={(e) => {
          signUp(emailRef.current.value, passRef.current.value)
        }
        }/>
      {/* </form> */}
    </div>
  )
}
