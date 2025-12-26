import { useEffect, useState } from "react";
import { loadTodos, saveTodos, createId } from "./todoStorage";
export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos());
  //只在第一次渲染时执行

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);
  //存储新的todo至localstorage

  function createTodo({ title, description, dueAt, importance }) {//新增参数记得在此定义
    const now = Date.now();
    const todo = {
      id: createId(),
      title: title || "",
      description: description || "",
      importance: importance ?? "normal",
      done: false,
      dueAt: dueAt ?? null,
      completedAt: null,
      createdAt: now,
      updatedAt: now,
    };
    //todo对象的详细内容

    setTodos((prev) => [todo, ...prev]);
    //把新的todo插到顶层

    return todo;
  }

function updateTodo(id, patch) {
  const now = Date.now();
  setTodos((prev) =>
    prev.map((t) => {
      if (t.id !== id) return t;

      const next = { ...t, ...patch, updatedAt: now };

      if (typeof patch.done === "boolean") {
        next.completedAt = patch.done ? (t.completedAt ?? now) : null;
      }// 如果编辑时改了done，维护 completedAt

      if ("dueAt" in patch) {
        next.dueAt = patch.dueAt ?? null;
      }// 如果编辑时传了dueAt，允许为 null

      if ("importance" in patch) {
          next.importance = patch.importance ?? "normal";
        }

      return next;
    })
  );
}

  //遍历所有todo，选择id一致的一条，复制并覆盖

  function removeTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }
  //只保留id与其不一致的todo

function toggleTodo(id) {
  const now = Date.now();
  setTodos((prev) =>
    prev.map((t) => {
      if (t.id !== id) return t;

      const nextDone = !t.done;
      return {
        ...t,//打补丁，局部更新
        done: nextDone,
        updatedAt: now,
        completedAt: nextDone ? now : null, 
        // 完成时记录完成时间；取消完成则清空

      };
    })
  );
}

  //对id一致的todo的done属性取反

  function getTodoById(id) {
    return todos.find((t) => t.id === id) || null;
  }
  //找到第一条id匹配的todo

  return {
    todos,
    createTodo,
    updateTodo,
    removeTodo,
    toggleTodo,
    getTodoById,
  };
}
