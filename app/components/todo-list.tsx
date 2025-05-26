"use client";

import type { Todo } from "@/app/generated/prisma";
import TodoItem from "./todo-item";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="fixed right-4 bottom-4 w-full max-w-sm">
      <ul className="space-y-4 rounded-lg bg-white p-4 shadow-md">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
