"use server";

import type { Todo } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

interface TODOTYPE {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createToDo = async (
  message: string,
): Promise<{ status: boolean; todo: Todo | null; message: string }> => {
  if (!message) {
    return {
      status: false,
      todo: null,
      message: "Please type a message in the TO-DO input.",
    };
  }

  try {
    const toDo = await prisma.todo.create({
      data: {
        message,
      },
    });

    return {
      status: true,
      todo: toDo,
      message: "TODO created",
    };
  } catch (error) {
    return {
      status: false,
      todo: null,
      message: "There was an error creating the TODO. Please try again",
    };
  }
};

export const getOneToDo = async (
  id: string,
): Promise<{ status: boolean; todo: Todo | null; message: string }> => {
  if (!id) {
    return {
      status: false,
      todo: null,
      message: "Unable to find the TO-DO. Please try again",
    };
  }

  try {
    const toDo = await prisma.todo.findUnique({
      where: { id },
    });

    return {
      status: true,
      todo: toDo,
      message: "TODO found",
    };
  } catch (error) {
    return {
      status: false,
      todo: null,
      message: "This T0-DO cannot be found. Please try again",
    };
  }
};

export const getManyToDo = async (): Promise<{
  status: boolean;
  todos: Todo[] | null;
  message: string;
}> => {
  try {
    const toDos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" }, // optional
    });

    return {
      status: true,
      todos: toDos,
      message: "All the ToDos found",
    };
  } catch (error) {
    return {
      status: false,
      todos: null,
      message: "Could not find all the ToDos. Please try again",
    };
  }
};

export const updateOneToDo = async (
  todo: Todo,
): Promise<{ status: boolean; todo: Todo | null; message: string }> => {
  if (!todo) {
    return {
      status: false,
      todo: null,
      message: "There is no data to update. Please try later",
    };
  }

  try {
    const updateTodo = await prisma.todo.update({
      where: { id: todo.id },
      data: {
        message: todo.message,
        done: todo.done,
      },
    });

    if (!updateTodo) {
      return {
        status: false,
        todo: null,
        message: "There was an error updating the TODO. Please try again",
      };
    }

    return { status: true, todo: updateTodo, message: "TODO updated" };
  } catch (error) {
    return {
      status: false,
      todo: null,
      message: "There was an error updating the TODO. Please try again",
    };
  }
};

export const deleteOneToDo = async (
  id: string,
): Promise<{ status: boolean; todo: Todo | null; message: string }> => {
  if (!id) {
    return {
      status: false,
      todo: null,
      message: "Unable to find the TO-DO. Please try again",
    };
  }

  try {
    const toDo = await prisma.todo.delete({
      where: { id },
    });

    return {
      status: true,
      todo: toDo,
      message: "TODO deleted",
    };
  } catch (error) {
    return {
      status: false,
      todo: null,
      message: "There was an error deleting the TODO. Please try again",
    };
  }
};

export const deleteAllToDos = async (): Promise<{
  status: boolean;
  count: number;
  message: string;
}> => {
  try {
    const toDos = await prisma.todo.deleteMany();

    return {
      status: true,
      count: toDos.count,
      message: "All the TODOS deleted",
    };
  } catch (error) {
    return {
      status: false,
      count: 0,
      message: "There was an error deleting all the TODOS. Please try again",
    };
  }
};
