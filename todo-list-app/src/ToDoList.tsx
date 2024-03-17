import { TodoItem } from "./ToDoItem";

interface ToDoListProps {
  todos: Todo[];
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
}
                                                                                              
export function ToDoList({ todos, toggleTodo, deleteTodo, editTodo }: ToDoListProps){
  return (
    <ul className="list-group">
      {todos.length === 0 && <li className="list-group-item">No Todos</li>}
      {todos.map(todo => (
        <TodoItem
        key={todo.id}
        {...todo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        />
      ))}
    </ul>
  );
}