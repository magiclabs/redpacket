"use client";
import { useState, useCallback } from "react";
import { useWalletContext } from "@/context/wallet";

export default function Login() {
  const { login } = useWalletContext();
  const [email, setEmail] = useState<string>("");

  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setEmail(e.target.value);
    },
    [],
  );

  const handleLogin = useCallback(async () => {
    await login(email);
    setEmail("");
  }, [login, email]);

  return (
    <div className="join w-full">
      <input
        onChange={onEmailChange}
        className="input input-bordered join-item w-full"
        placeholder="Your Email"
      />
      <button onClick={handleLogin} className="btn btn-primary join-item">
        Login
      </button>
    </div>
  );
}
