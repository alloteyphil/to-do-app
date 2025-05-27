"use client";

import { getManyToDo } from "@/actions/todo.actions";
import TodoList from "./todo-list";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Todos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await getManyToDo(),
    staleTime: 1000 * 60 * 5,
  });

  const filteredTodos =
    todos?.todos?.filter((todo) =>
      todo.message.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

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

  return (
    <div className="fixed top-4 right-4 w-full max-w-sm">
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-md border border-gray-300 p-2"
      />

      <TodoList todos={filteredTodos} />
    </div>
  );
};

export default Todos;
