//存储层

const STORAGE_KEY = "todos_v1";

export function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    //从localstorage中调用todos_v1

    if (!raw) return [];
    const parsed = JSON.parse(raw);
    //字符串转为对象

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  //数组转为字符串

}

export function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString() + Math.random().toString(16).slice(2);
  //随机生成id，适应老版浏览器

}