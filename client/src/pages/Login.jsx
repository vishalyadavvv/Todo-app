import React, { useContext, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

export default function Login() {
  const { login, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ identifier: "", password: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 card fade-in">
      <h2 className="text-2xl font-bold mb-4 text-center">Welcome back</h2>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Input label="Email or Username" name="identifier" value={form.identifier} onChange={handle} />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handle} />
        <Button type="submit" className="justify-center">
          {loading ? <Spinner /> : "Login"}
        </Button>
      </form>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Don't have an account? <a className="text-blue-600 underline" href="/register">Register</a>
      </p>
    </div>
  );
}
