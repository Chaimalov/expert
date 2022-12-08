import React, { useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button, Input } from "../components";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { signInWithGoogle, signUpWithEmailAndPassword } = useAuth();
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState();

  return (
    <div className="flex full-page">
      <section style={{ fontSize: 25 }}>
        <div>
          <h1>this is expert</h1>
          <h3>expiry dates by the experts</h3>
        </div>
        <h1>🥭 + 📅 = 😊</h1>
      </section>
      <section>
        <div>
          <h2>Create your account</h2>
          <h4>You'll be up & running in 2 minutes</h4>
        </div>
        <Button full-width large onClick={signInWithGoogle}>
          <div className="flex">
            <FaGoogle />
            continue with google
          </div>
        </Button>
        <div className="flex nowarp">
          <div className="line"></div>
          <h4>Or register with your email</h4>
          <div className="line"></div>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            error={error}
            name="email"
            type="email"
            placeholder="user@gmail.com"
            ref={email}
            autoFocus
            onFocus={() => setError(undefined)}
          />
          <Input
            error={error}
            name="password"
            type="password"
            ref={password}
            placeholder="at least 6 characters"
          />
          <Button
            full-width
            large
            value="continue"
            onClick={() =>
              signUpWithEmailAndPassword(
                email.current.value,
                password.current.value,
                setError
              )
            }
          />
          <span className="danger">{error && "* " + error}</span>
        </form>
      </section>
    </div>
  );
}
