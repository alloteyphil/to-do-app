"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddToDo from "./components/add-todo";
import Todos from "./components/todos";
import { Suspense } from "react";

export default function Home() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <div className="mx-auto mt-10 max-w-md">
        <AddToDo />

        <Todos />
      </div>
    </QueryClientProvider>
  );
}
