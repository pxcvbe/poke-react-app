import type { PokemonDetail } from "../../types/pokemon";
import { useInventory } from "../../contexts/inventory";
import { useAuth } from "../../contexts/auth";
import { useToast } from "../toast";
import { useBall } from "../../contexts/ball";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PokemonDetailModal({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: PokemonDetail | null;
}) {
  const { isCaught, catchOne, releaseOne } = useInventory();
  const { user } = useAuth();
  const { multiplier } = useBall();
  const toast = useToast();
  const nav = useNavigate();
  const [catching, setCatching] = useState(false);

  if (!open || !data) return null;
  const img =
    data.sprites.other?.["official-artwork"]?.front_default ||
    data.sprites.front_default;
  const caught = isCaught(data.id);

  async function handleToggle() {
    if (!user) {
      toast.show('Please login to catch Pokemon')
      nav('/login', {
        replace: true,
        state : { redirect: '/' }
      })
      return
    }

    if (caught) {
      releaseOne(data.id)
      toast.show('Released 🫗')
      return
    }

    nav(`/battle/${data?.name}`)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-xl p-4 md:p-6 text-gray-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className="w-36 h-36 shrink-0 bg-gray-50 dark:bg-zinc-800 rounded-xl grid place-items-center overflow-hidden">
            {img ? (
              <img
                src={img}
                alt={data.name}
                className={`w-full ${catching ? "animate-pulse" : ""}`}
              />
            ) : (
              <div className="skeleton w-20 h-20" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              #{String(data.id).padStart(3, "0")}
            </p>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold capitalize">{data.name}</h3>
              <button
                onClick={handleToggle}
                disabled={catching}
                className={`px-3 py-1.5 rounded-xl text-sm border ${
                  caught
                    ? "border-green-600 text-green-700 dark:text-green-400"
                    : "border-gray-200 text-gray-700 dark:text-zinc-100 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800"
                } disabled:opacity-50`}
              >
                {caught ? "In Inventory" : catching ? "Catching…" : "Catch"}
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.types.map((t) => (
                <span
                  key={t.type.name}
                  className="px-2 py-1 rounded bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-100 text-xs capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500 dark:text-zinc-400">
                  Height:
                </span>{" "}
                {data.height}
              </div>
              <div>
                <span className="text-gray-500 dark:text-zinc-400">
                  Weight:
                </span>{" "}
                {data.weight}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-1">Base Stats</h4>
              <ul className="space-y-1">
                {data.stats.map((s) => (
                  <li
                    key={s.stat.name}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="w-28 capitalize text-gray-600 dark:text-zinc-300">
                      {s.stat.name}
                    </span>
                    <div className="flex-1 h-2 rounded bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{
                          width: `${Math.min(100, (s.base_stat / 200) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="w-8 text-right">{s.base_stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border hover:bg-gray-50 dark:hover:bg-zinc-800 border-gray-200 dark:border-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
