"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";

function SignInButton() {
  return (
    <div>
      <button
        onClick={() =>
          signIn("credentials", {
            callbackUrl: `${window.location.origin}/login`,
          })
        }
      >
        LogIn
      </button>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
}

export default SignInButton;
