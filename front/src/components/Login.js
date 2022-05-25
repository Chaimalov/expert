import { useAuth } from '../context/AuthContext';
import { Button } from "./Button"

export function Login() {

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
    <div className='sign'>
      {user.uid ?
        <Button value="sign out" onClick={signOut} />
        :
        <Button value="sign in with google" onClick={signin} />
      }
    </div>
  );
}

