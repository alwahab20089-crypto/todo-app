import { useState, useEffect } from "react";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";
export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (task.trim() === "") return;

    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  const toggleComplete = (index) => {
    const updatedTodos = [...todos];

    updatedTodos[index].completed =
      !updatedTodos[index].completed;

    setTodos(updatedTodos);
  };
  const editTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  }; const saveEdit = (index) => {
    const updatedTodos = [...todos];

    updatedTodos[index].text = editText;

    setTodos(updatedTodos);
    setEditIndex(null);
  };
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden p-4">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://media.canva.com/v2/image-resize/format:PNG/height:1040/quality:100/uri:ifs%3A%2F%2FM%2Fc8415c8c-9b65-4cc9-a8b2-79a03f1e1142/watermark:F/width:1392?csig=AAAAAAAAAAAAAAAAAAAAAEVrwUAv1Z04Tl14QOEmRKZp4OP49w4qdgVirBP-gm4S&exp=1778334987&osig=AAAAAAAAAAAAAAAAAAAAAJP9owFLySU_5eOeku_OpU5R4Z1dBZo1ENKXXPILz3Pb&signer=media-rpc&x-canva-quality=screen_3x?q=80&w=1200&auto=format&fit=crop"
          alt="background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Floating Blur Effects */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-blue-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-lg backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02]">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-lg">
            ✨ Todo App
          </h1>

          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Organize your daily tasks beautifully
          </p>
        </div>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 px-5 py-3 rounded-2xl border border-gray-300 bg-white/80 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-md"
          />

          <button
            onClick={addTodo}
            className="items-start gap-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white px-3 py-2 sm:px-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="group flex items-start justify-between gap-3 bg-white/80 backdrop-blur-md border border-gray-200 px-5 py-4 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"            >
              {editIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => saveEdit(index)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                  autoFocus
                  className="w-full px-3 py-2 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              ) : (
                <span
                  className={`font-medium break-words whitespace-normal w-full pr-3 overflow-hidden transition-all duration-300 ${todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                    }`}
                >
                  {todo.text}
                </span>
              )}
              <button
                onClick={() => editTodo(index)}
                className="px-3 py-2 sm:px-4 items-start gap-3 rounded-xl bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <FaEdit size={14} />
              </button>
              <button
                onClick={() => toggleComplete(index)}
                className={`px-3 py-2 sm:px-4 items-start gap-3 rounded-xl transition-all duration-300 shadow-sm
  ${todo.completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-green-500 hover:text-white"
                  }`}
              >
                <span className="hidden sm:inline">
                  {todo.completed ? "Completed" : "Complete"}
                </span>

                <span className="sm:hidden">
                  <FaCheck size={14} />
                </span>              </button>

              <button
                onClick={() => removeTodo(index)}
                className="bg-red-100 text-red-500 px-3 py-2 sm:px-4 items-start gap-3 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"

              >
                <span className="hidden sm:inline">Delete</span>

                <span className="sm:hidden">
                  <FaTrash size={14} />
                </span>              </button>

            </li>
          ))}
        </ul>

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="text-center text-gray-500 mt-6 animate-bounce">
            No tasks added yet 🚀
          </div>
        )}
      </div>
    </div>
  )
};