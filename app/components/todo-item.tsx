"use client";

import { useState } from "react";
import { Trash, Pencil } from "lucide-react";
import { deleteOneToDo, updateOneToDo } from "@/actions/todo.actions";
import type { Todo } from "../generated/prisma";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDone, setIsDone] = useState(todo.done); // Local state for optimistic updates
  const [todoInput, setTodoInput] = useState(todo.message);

  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: (updatedTodo: Todo) => {
      return updateOneToDo(updatedTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const {
    mutate: updateMutation,
    isPending: isUpdating,
    isError: isUpdateError,
  } = useMutation({
    mutationFn: (updatedTodo: Todo) => updateOneToDo(updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsEditing(false); // Only close edit mode after successful update
    },
    onError: () => {
      alert("Failed to update the todo. Please try again");
      setTodoInput(todo.message); // Reset to original message on error
    },
  });

  const {
    mutate: deleteMutation,
    isPending: isDeleting,
    isError: isDeleteError,
  } = useMutation({
    mutationFn: (id: string) => deleteOneToDo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleToggleDone = () => {
    setIsDone(!isDone);
    toggleMutation.mutate({ ...todo, done: !isDone });
  };

  const handleUpdateMessage = () => {
    if (todoInput.trim() === "") return;
    updateMutation({ ...todo, message: todoInput });
  };

  const handleDelete = () => {
    deleteMutation(todo.id);
  };

  return (
    <li className="relative border-b py-6">
      <div
        className={`cursor-pointer pr-20 transition-all duration-200 ${
          isDone ? "text-gray-400 line-through opacity-50" : "opacity-100"
        }`}
        onClick={() => {
          if (isUpdating || isDeleting) return;
          handleToggleDone();
        }}
      >
        {isEditing ? (
          <input
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            onBlur={handleUpdateMessage}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdateMessage();
              }
              if (e.key === "Escape") {
                setTodoInput(todo.message);
                setIsEditing(false);
              }
            }}
            className="w-full bg-transparent outline-none"
            autoFocus
          />
        ) : (
          <span>{todoInput}</span>
        )}
      </div>
      <div className="absolute right-2 bottom-2 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="cursor-pointer hover:text-blue-500 disabled:opacity-50"
          type="button"
          disabled={isUpdating || isDeleting}
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer hover:text-red-500 disabled:opacity-50"
          type="button"
          disabled={isDeleting || isUpdating}
        >
          {isDeleting ? "..." : <Trash size={16} />}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
