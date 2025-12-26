//纯表单组件

import { useMemo, useState } from "react";

function tsToLocalInputValue(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}
//把时间戳转成字符串

function localInputValueToTs(value) {
  if (!value) return null;
  const ts = new Date(value).getTime();
  return Number.isFinite(ts) ? ts : null;
}
//把字符串转成时间戳(更适合用于计算与排序)

export default function TodoForm({
  initialValues,
  onSubmit,
  submitText = "保存",
}) {
  const init = useMemo(() => {
    return {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      dueAtInput: tsToLocalInputValue(initialValues?.dueAt ?? null),
    };
  }, [initialValues]);

  const [title, setTitle] = useState(init.title);
  const [description, setDescription] = useState(init.description);
  const [dueAtInput, setDueAtInput] = useState(init.dueAtInput);
  //表单输入有修改时更新state
  const [error, setError] = useState("");
  const [importance, setImportance] = useState(
  initialValues?.importance ?? "important"//默认计划重要
);


  function handleSubmit(e) {
    e.preventDefault();
    //阻止浏览器默认刷新提交

    setError("");

    const trimmed = title.trim();
    if (!trimmed) {
      setError("标题不能为空");
      return;
    }

    const dueAt = localInputValueToTs(dueAtInput);

    onSubmit({
      title: trimmed,
      description: description.trim(),
      dueAt,
      importance,
    });
    //提交数据

  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <label>标题 *</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="这次任务的名称是..."
          className="
            w-full
            rounded-lg
            border border-stone-300
            bg-white
            px-3 py-2
            text-sm text-stone-600
            placeholder:text-stone-400
            transition
            focus:border-stone-500
            focus:ring-2 focus:ring-stone-200
            focus:outline-none
          "
        />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>描述</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="需要的话就备注一下任务细节吧！"
          className="
            w-full
            rounded-lg
            border border-stone-300
            bg-white
            px-3 py-2
            text-sm text-stone-600
            placeholder:text-stone-400
            transition
            focus:border-stone-500
            focus:ring-2 focus:ring-stone-200
            focus:outline-none
          "
          rows={5}
        />
      </div>

      <div>
        <label>重要性</label>
        <select
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            className="
            w-full
            rounded-lg
            border border-stone-300
            bg-white
            px-3 py-2
            text-sm text-stone-600
            placeholder:text-stone-400
            transition
            focus:border-stone-500
            focus:ring-2 focus:ring-stone-200
            focus:outline-none
          "
        >
            <option value="important">重要</option>
            <option value="normal">不重要</option>
        </select>
        </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>期望完成时间（选填）</label>
        <input
          type="datetime-local"
          value={dueAtInput}
          onChange={(e) => setDueAtInput(e.target.value)}
          className="
            w-full
            rounded-lg
            border border-stone-300
            bg-white
            px-3 py-2
            text-sm text-stone-600
            placeholder:text-stone-400
            transition
            focus:border-stone-500
            focus:ring-2 focus:ring-stone-200
            focus:outline-none
          "
        />
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          未填写将排在未完成列表的最后
        </div>
      </div>


      {error ? <div className="text-sm text-amber-700">{error}</div> : null}

      <button type="submit" 
      className="
              rounded-lg
              bg-amber-50
              px-3 py-1.5
              text-sm font-medium text-amber-700
              transition
              hover:bg-amber-100 hover:border-amber-400
              active:scale-95"
      style={{ width: "fit-content" }}>
        {submitText}
      </button>
    </form>
  );
}
