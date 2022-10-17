import React from "react";
import { Button, Input } from "../components";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export function Account() {
  const { user, deleteAccount } = useAuth();

  const deleteAccountAction = () => {
    toast((t) => (
      <div className="grid">
        <h4>are you sure you would like to delete your account?</h4>
        <h4 className="danger color"> This action cannot be undone!</h4>

        <div className="flex m-auto">
          <Button
            danger
            onClick={() => {
              deleteAccount();
              toast.dismiss(t.id);
            }}
          >
            delete
          </Button>
          <Button onClick={() => toast.dismiss(t.id)}>cancel</Button>
        </div>
      </div>
    ));
  };

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
        <Button danger onClick={() => deleteAccountAction()}>
          delete account
        </Button>
      </div>
    </div>
  );
}
