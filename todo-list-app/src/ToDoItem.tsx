import { useState } from "react";

interface TodoItemProps {
  id: string;
  task: string;
  completed: boolean;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTask: string) => void;
}

export function TodoItem({
  id,
  completed,
  task,
  toggleTodo,
  deleteTodo,
  editTodo
}: TodoItemProps) {
  const [editable, setEditable] = useState(false);
  const[newTask, setNewTask] = useState(task);

  function handleSaveEdit() {
    editTodo(id, newTask);
    setEditable(false);
  }

  return (
    <li>
      <div>
        {!editable ? (
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={e => toggleTodo(id, e.target.checked)}
            />
            {task}
          </label>
        ) : (
          <input type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
        )}
      </div>
      <div>
        <button onClick={() => setEditable(!editable)} className="btn btn-secondary">
          {editable ? "Cancel" : "Edit"}
        </button>
        <button onClick={() => deleteTodo(id)} className="btn btn-danger">
          Delete
        </button>
        {editable && (
          <button onClick={handleSaveEdit} className="btn btn-success">
            Save
          </button>
        )}
      </div>
    </li>
  );
}