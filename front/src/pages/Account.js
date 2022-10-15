import React from "react";
import { Button } from "../components";
import { useAuth } from "../context/AuthContext";

export function Account() {
  const { user, deleteAccount } = useAuth();
  return (
    <div className="center m2 text-center">
      <h1>User Settings</h1>
      {user?.photoURL && <img src={user.photoURL} alt="profile" />}
      <h2>{user?.displayName}</h2>
      <h2>{user?.email}</h2>
      <br />
      <div className="center">
        <Button danger onClick={() => deleteAccount()}>
          delete account
        </Button>
      </div>
    </div>
  );
}
