import { useEffect, useState } from "react";
import { api } from "../../service/axios";

export default function TypeFilter({ value, onChange, }: { value: string; onChange: (v: string) => void; }) {

  const [types, setTypes] = useState<{ name: string }[]>([]);
  useEffect(() => {
    api
      .get("/type")
      .then(({ data }) => setTypes(data.results))
      .catch(() => setTypes([]));
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-xl px-3 py-2 w-full md:w-56 bg-white text-gray-900 border-gray-200 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100"
    >
      <option value="">All types</option>
      {types.map((t) => (
        <option key={t.name} value={t.name}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
