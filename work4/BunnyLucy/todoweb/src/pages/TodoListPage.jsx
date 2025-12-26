import { Link } from "react-router-dom";
// 路由当中的<a>

import { useTodos } from "../lib/useTodos";

const H48 = 48 * 60 * 60 * 1000;

function pad2(n) {
  return String(n).padStart(2, "0");
}

function startOfLocalDay(ts) {
  const d = new Date(ts);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function formatHHMM(ts) {
  const d = new Date(ts);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

// 判断今天/明天/后天
function dayDiffFromToday(ts) {
  const today0 = startOfLocalDay(Date.now());
  const that0 = startOfLocalDay(ts);
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((that0 - today0) / oneDay);
}

// 同一年不显示年份
function formatDateNoYearIfSameYear(ts) {
  const d = new Date(ts);
  const now = new Date();
  const sameYear = d.getFullYear() === now.getFullYear();

  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();

  if (sameYear) {
    return `${m}月${day}日`;
  }
  return `${y}年${m}月${day}日`;
}

function formatDueAt(ts) {
  const diff = dayDiffFromToday(ts);
  const time = formatHHMM(ts);

  if (diff === 0) return `今天 ${time}`;
  if (diff === 1) return `明天 ${time}`;
  if (diff === 2) return `后天 ${time}`;

  // 其它日期
  return `${formatDateNoYearIfSameYear(ts)} ${time}`;
}

function isDueWithin48h(todo) {
  if (!todo.dueAt) return false;
  return todo.dueAt - Date.now() <= H48;
}

function isOverdue(todo) {
  if (todo.done) return false;
  if (todo.dueAt == null) return false;
  return Date.now() > todo.dueAt;
}

function sortIncomplete(a, b) {
  const aHasDue = a.dueAt != null;
  const bHasDue = b.dueAt != null;

  //有dueAt的排前面
  if (aHasDue && !bHasDue) return -1;
  if (!aHasDue && bHasDue) return 1;

  //都有dueAt,越早越紧急（小的在前）
  if (aHasDue && bHasDue) {
    if (a.dueAt !== b.dueAt) return a.dueAt - b.dueAt;
  }

  //都没 dueAt 或 dueAt 相同,后创建的在前（createdAt大的在前）
  return (b.createdAt ?? 0) - (a.createdAt ?? 0);
}

function sortComplete(a, b) {
  //刚完成的在前
  return (b.completedAt ?? 0) - (a.completedAt ?? 0);
}

export default function TodoListPage() {
  const { todos, toggleTodo, removeTodo } = useTodos();

  //分组三列
  const importantUrgent = [];
  const importantLater = [];
  const normalTodos = [];

  todos.forEach((todo) => {
    const imp = todo.importance ?? "normal"; 
    if (imp === "important") {
      if (isDueWithin48h(todo)) {
        importantUrgent.push(todo);
      } else {
        importantLater.push(todo);
      }
    } else {
      normalTodos.push(todo);
    }
  });

  //每列内部按照逻辑排序
  function sortColumn(list) {
    const incomplete = list.filter((t) => !t.done).slice().sort(sortIncomplete);
    const complete = list.filter((t) => t.done).slice().sort(sortComplete);
    return [...incomplete, ...complete];
  }

  const col1 = sortColumn(importantUrgent);
  const col2 = sortColumn(importantLater);
  const col3 = sortColumn(normalTodos);

  function renderTodoItem(todo) {
  const overdue = isOverdue(todo);
  const important = (todo.importance ?? "normal") === "important";

  return (
    <li
      key={todo.id}
      className={[
        "mt-2 rounded-xl border bg-white p-3",
        "transition hover:shadow-sm",
        todo.done ? "opacity-60" : "hover:shadow-md",
        overdue ? "overdue-glow border-amber-400" : "border-stone-200",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleTodo(todo.id)}
          className="mt-1 h-4 w-4 shrink-0 accent-stone-900"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <Link
            to={`/todo/${todo.id}`}
            className={[
                "block min-w-0 flex-1 font-medium hover:underline text-stone-900",
                //不要加truncate，会导致标题被裁切

                "font-medium text-stone-900 hover:underline",
                todo.done ? "line-through text-stone-500" : "",
            ].join(" ")}
            >
            {todo.title || "（无标题）"}
            </Link>

            <span
              className={[
                "shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs",
                important
                  ? "bg-amber-100 text-amber-700"
                  : "bg-stone-100 text-stone-600",
              ].join(" ")}
            >
              {important ? "重要" : "不重要"}
            </span>
          </div>

          {/* 避免没有计划时间时显示1970年*/}
            {todo.dueAt != null && (
            <div className={["mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs",
                overdue ? "text-amber-700" : "text-stone-500"
            ].join(" ")}>
                <span className="whitespace-nowrap">计划时间：</span>
                <span className="whitespace-nowrap">{formatDueAt(todo.dueAt)}</span>
            </div>
            )}
        </div>

        <button
          onClick={() => removeTodo(todo.id)}
          className="
              ml-auto
              inline-flex items-center gap-1
              rounded-lg
              bg-amber-50
              px-3 py-1.5
              text-sm font-medium text-amber-700
              transition
              hover:bg-amber-100 hover:border-amber-400
              active:scale-95
            "
        >
          删除
        </button>
      </div>
    </li>
  );
}


  //三列布局 pt为顶部留白 px左右 pb底部
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-5xl lg:max-w-6xl p-4">
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-stone-700">重要 · 紧急</h3>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs text-stone-600">
                {col1.filter((t) => !t.done).length}/{col1.length}
                </span>
            </div>

            {col1.length === 0 ? (
                <div className="rounded-xl border border-dashed border-stone-300 bg-white p-3 text-sm text-stone-500">
                <div className="font-medium text-stone-700">暂无此类任务</div>
                <div className="mt-1 text-xs text-stone-500">可以点击右上角“添加任务”创建一条</div>
                </div>
            ) : (
                <ul className="list-none p-0">
                {col1.map(renderTodoItem)}
                </ul>
            )}
            </div>

        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-stone-700">重要 · 不紧急</h3>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs text-stone-600">
                {col2.filter((t) => !t.done).length}/{col2.length}
                </span>
            </div>

            {col2.length === 0 ? (
                <div className="rounded-xl border border-dashed border-stone-300 bg-white p-3 text-sm text-stone-500">
                <div className="font-medium text-stone-700">暂无此类任务</div>
                <div className="mt-1 text-xs text-stone-500">可以点击右上角“添加任务”创建一条</div>
                </div>
            ) : (
                <ul className="list-none p-0">
                {col2.map(renderTodoItem)}
                </ul>
            )}
            </div>
        
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-stone-700">不重要</h3>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs text-stone-600">
                {col3.filter((t) => !t.done).length}/{col3.length}
                </span>
            </div>

            {col3.length === 0 ? (
                <div className="rounded-xl border border-dashed border-stone-300 bg-white p-3 text-sm text-stone-500">
                <div className="font-medium text-stone-700">暂无此类任务</div>
                <div className="mt-1 text-xs text-stone-500">可以点击右上角“添加任务”创建一条</div>
                </div>
            ) : (
                <ul className="list-none p-0">
                {col3.map(renderTodoItem)}
                </ul>
            )}
            </div>
            </div>
      </div>
    </div>
  );
}
