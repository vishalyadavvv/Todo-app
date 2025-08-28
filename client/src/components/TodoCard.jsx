import React from "react";
import { Link } from "react-router-dom";

export default function TodoCard({ todo, onToggle, onDelete }) {
  return (
    <div className="card flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(todo._id, todo.completed)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition ${todo.completed ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-400'}`}
        >
          {todo.completed ? '✓' : '○'}
        </button>
      </div>

      <div className="flex-1">
        <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
        {todo.dueDate && <div className="mt-2 text-xs text-gray-500">Due: {new Date(todo.dueDate).toLocaleDateString()}</div>}
      </div>

      <div className="flex items-center gap-2">
        <Link to={`/todo/edit/${todo._id}`} className="text-sm text-blue-600 hover:underline">Edit</Link>
        <button onClick={() => onDelete(todo._id)} className="text-red-500 font-semibold">Delete</button>
      </div>
    </div>
  );
}
