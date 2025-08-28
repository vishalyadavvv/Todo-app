import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  const fetch = async () => {
    try {
      const u = await api.get("/admin/users");
      const t = await api.get("/admin/todos");
      setUsers(u.data);
      setTodos(t.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetch(); }, []);

  const changeRole = async (id, role) => {
    await api.patch(`/admin/users/${id}/role`, { role });
    fetch();
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 grid gap-6">
      <div className="card">
        <h2 className="text-xl font-bold mb-3">Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-t">
                  <td className="py-2">{u.username || u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.role}</td>
                  <td className="py-2">
                    {u.role !== 'admin' ? <button onClick={() => changeRole(u._id, 'admin')} className="text-sm bg-green-500 text-white px-2 py-1 rounded">Promote</button>
                      : <button onClick={() => changeRole(u._id, 'user')} className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">Demote</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-3">All Todos</h2>
        <div className="grid gap-3">
          {todos.map(t => (
            <div key={t._id} className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-gray-600">{t.description}</div>
                <div className="text-xs text-gray-500 mt-1">By: {t.user?.username || t.user?.email}</div>
              </div>
              <div className="text-sm">{t.completed ? 'Done' : 'Open'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
