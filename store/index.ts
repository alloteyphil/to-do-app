import type { Todo } from "@/app/generated/prisma";
import { create } from "zustand";

interface TodoStore {
  todos: Todo[];
  setTodo: (todos: Todo[]) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  setTodo: (todos: Todo[]) => set({ todos }),
}));
