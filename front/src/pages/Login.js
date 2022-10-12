import React, { useRef } from "react";
import { Button, Input } from "../components";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { signInWithGoogle, signUpWithEmailAndPassword, signIn } = useAuth();
  const email = useRef();
  const password = useRef();

  return (
    <div className="flex full-page">
      <section>
        <h1>this is expert</h1>
        <h2>expiry dates by the experts</h2>
        <p>
          This HTML file is a template. If you open it directly in the browser,
          you will see an empty page. You can add webfonts, meta tags, or
          analytics to this file. The build step will place the bundled scripts
          into the tag. To begin the development, run `npm start` or `yarn
          start`. To create a production bundle, use `npm run build` or `yarn
          build`.
        </p>
      </section>
      <section className="text-center">
        <Input
          name="email"
          type="email"
          placeholder="user@gmail.com"
          ref={email}
        />
        <Input
          name="password"
          type="password"
          ref={password}
          placeholder="at least 6 characters"
        />
        <div class="flex">
          <Button
            large
            value="sign in"
            onClick={() => signIn(email.current.value, password.current.value)}
          />
          <Button
            large
            value="sign up"
            onClick={() =>
              signUpWithEmailAndPassword(
                email.current.value,
                password.current.value
              )
            }
          />
        </div>
        <Button large value="sign in with google" onClick={signInWithGoogle} />
      </section>
    </div>
  );
}
