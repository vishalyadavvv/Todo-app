import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";

export default function CreateEditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", dueDate: "", category: "Non-Urgent" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await api.get(`/todos/${id}`);
      const t = res.data;
      setForm({ title: t.title, description: t.description || "", dueDate: t.dueDate ? new Date(t.dueDate).toISOString().slice(0,10) : "", category: t.category || "Non-Urgent" });
    })();
  }, [id]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) await api.put(`/todos/${id}`, form);
      else await api.post(`/todos`, form);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto mt-10 card">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Todo" : "Create Todo"}</h2>
      <form className="flex flex-col gap-4" onSubmit={submit}>
        <Input label="Title" name="title" value={form.title} onChange={handle} required />
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Description</span>
          <textarea name="description" value={form.description} onChange={handle} className="border px-3 py-2 rounded-lg" rows="4" />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Due Date</span>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handle} className="border px-3 py-2 rounded-lg" />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Category</span>
          <select name="category" value={form.category} onChange={handle} className="border px-3 py-2 rounded-lg">
            <option>Urgent</option>
            <option>Non-Urgent</option>
          </select>
        </label>
        <div className="flex justify-end">
          <Button type="submit">{loading ? "Saving..." : id ? "Update" : "Create"}</Button>
        </div>
      </form>
    </div>
  );
}
