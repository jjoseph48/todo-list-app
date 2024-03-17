import { useState } from "react";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
}

export function TodoItem({
  id,
  completed,
  title,
  toggleTodo,
  deleteTodo,
  editTodo
}: TodoItemProps) {
  const [editable, setEditable] = useState(false);
  const[newTitle, setNewTitle] = useState(title);

  function handleSaveEdit() {
    editTodo(id, newTitle);
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
            {title}
          </label>
        ) : (
          <input type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
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