import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const API = `${import.meta.env.VITE_API_URL}/api/todos`;

  const fetchTodos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;

    setLoading(true);

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    await fetchTodos();
    setLoading(false);
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          🐳 Docker Todo App 2.0
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Enter a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={addTodo}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-400">No todos yet 🚀</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl hover:shadow-sm transition"
              >
                <span className="text-gray-700">{todo.title}</span>

                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-700 text-lg transition"
                  title="Delete"
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;