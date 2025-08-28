import React, { useContext, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

export default function Register() {
  const { register, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 card fade-in">
      <h2 className="text-2xl font-bold mb-4 text-center">Create an account</h2>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Input label="Username" name="username" value={form.username} onChange={handle} />
        <Input label="Email" name="email" value={form.email} onChange={handle} />
        <Input label="Password" type="password" name="password" value={form.password} onChange={handle} />
        <Button type="submit" className="justify-center">{loading ? <Spinner /> : "Register"}</Button>
      </form>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Already registered? <a className="text-blue-600 underline" href="/login">Login</a>
      </p>
    </div>
  );
}
