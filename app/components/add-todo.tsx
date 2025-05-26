"use client";

import { createToDo } from "@/actions/todo.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddTodoForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (message: string) => createToDo(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = (formData: FormData) => {
    const message = formData.get("message") as string;
    if (!message) return;
    mutation.mutate(message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          handleAddTodo(formData);
          (e.target as HTMLFormElement).reset();
        }}
        className="flex w-full max-w-lg justify-center gap-2 p-4"
      >
        <input
          type="text"
          name="message"
          placeholder="Add a new todo"
          className="w-full rounded-md border border-gray-300 p-2"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-md bg-blue-500 p-2 text-white disabled:opacity-50"
        >
          {mutation.isPending ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}
