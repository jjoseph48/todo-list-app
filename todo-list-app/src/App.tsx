import { useEffect, useState } from 'react'
import { NewTodoForm } from './NewToDoForm';
import { ToDoList } from './ToDoList';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title: string) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false
        },
      ];
    });
  }

  function toggleTodo(id: string, completed: boolean) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id: string) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  }

  function editTodo(id: string, newTitle: string) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }

        return todo;
      });
    });
  }

  return (
    <>
      <div className="container mt-1">
        <div className="col-lg-8 col-md-10">
          <h1 className="header mb-2">Todo List</h1>
          <div className="p-3">
            <NewTodoForm onSubmit={addTodo} />
          </div>
          <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
        </div>
      </div>
    </>
  )
}

export default App
