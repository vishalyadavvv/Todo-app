import React, { useContext, useEffect, useState } from "react";
import api from "../services/api";
import TodoCard from "../components/TodoCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function TodoDashboard() {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchTodos(); }, []);

  const handleToggle = async (id, completed) => {
    await api.put(`/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this todo?")) return;
    await api.delete(`/todos/${id}`);
    fetchTodos();
  };

  const filtered = todos.filter(t => filter === 'all' ? true : (filter === 'done' ? t.completed : !t.completed));

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Hi, {user?.username || 'User'}</h1>
          <p className="text-sm text-gray-600">Manage your tasks</p>
        </div>
        <div className="flex gap-2 items-center">
          <Link to="/todo/new" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow">+ New Todo</Link>
          <div className="bg-white rounded-lg shadow p-2 flex gap-2">
            <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter==='all'?'bg-blue-600 text-white':''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`px-3 py-1 rounded ${filter==='active'?'bg-blue-600 text-white':''}`}>Active</button>
            <button onClick={() => setFilter('done')} className={`px-3 py-1 rounded ${filter==='done'?'bg-blue-600 text-white':''}`}>Done</button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12"><div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid gap-4">
          {filtered.length === 0 ? (
            <div className="card text-center text-gray-500">No todos yet — create one!</div>
          ) : (
            filtered.map(todo => (
              <TodoCard key={todo._id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
