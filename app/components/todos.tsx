"use client";

import { getManyToDo } from "@/actions/todo.actions";
import TodoList from "./todo-list";
import { useQuery } from "@tanstack/react-query";

const Todos = () => {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getManyToDo(),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="fixed right-4 bottom-4 w-full max-w-sm">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="fixed right-4 bottom-4 w-full max-w-sm">
        Error fetching todos
      </div>
    );
  }

  if (!todos?.todos) {
    return (
      <div className="fixed right-4 bottom-4 w-full max-w-sm">
        No todos found
      </div>
    );
  }

  return <TodoList todos={todos.todos} />;
};

export default Todos;
