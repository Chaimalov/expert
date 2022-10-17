import React from "react";
import { Button, Input } from "../components";
import { useAuth } from "../context/AuthContext";

export function Account() {
  const { user, deleteAccount } = useAuth();
  return (
    <div className="center m2 text-center">
      <h1>User Settings</h1>
      <img src={user.photoURL} alt="profile" />
      <Input
        type="text"
        name="user name"
        placeholder={user.displayName || "Not set"}
        disabled
      />
      <Input type="email" name="email" placeholder={user.email} disabled />
      <label htmlFor="dropdown">
        <h4>notify at:</h4>
      </label>
      <select id="dropdown">
        <option>same day</option>
        <option>2 days in advance</option>
        <option>1 week in advance</option>
      </select>
      <br />
      <div className="center">
        <Button danger onClick={() => deleteAccount()}>
          delete account
        </Button>
      </div>
    </div>
  );
}
