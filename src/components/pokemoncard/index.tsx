import type { PokemonDetail } from "../../types/pokemon";
import { useInventory } from "../../contexts/inventory";
import { useAuth } from "../../contexts/auth";
import { useToast } from "../toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function badgeColor(type: string) {
  const colors: Record<string, string> = {
    fire: "bg-red-100 text-red-700",
    water: "bg-blue-100 text-blue-700",
    grass: "bg-green-100 text-green-700",
    electric: "bg-yellow-100 text-yellow-700",
    psychic: "bg-pink-100 text-pink-700",
    ice: "bg-cyan-100 text-cyan-700",
    fighting: "bg-orange-100 text-orange-700",
    poison: "bg-purple-100 text-purple-700",
    ground: "bg-amber-100 text-amber-700",
    flying: "bg-indigo-100 text-indigo-700",
    bug: "bg-lime-100 text-lime-700",
    rock: "bg-stone-100 text-stone-700",
    ghost: "bg-violet-100 text-violet-700",
    dragon: "bg-sky-100 text-sky-700",
    dark: "bg-zinc-100 text-zinc-700",
    steel: "bg-slate-100 text-slate-700",
    fairy: "bg-fuchsia-100 text-fuchsia-700",
    normal: "bg-gray-100 text-gray-700",
  };

  return colors[type] ?? "bg-gray-100 text-gray-700";
}

export default function PokemonCard({
  data,
  onClick,
}: {
  data: PokemonDetail;
  onClick: () => void;
}) {

  const { isCaught, catchOne, releaseOne } = useInventory();
  const { user } = useAuth();
  const toast = useToast();
  const nav = useNavigate();
  const [catching] = useState(false);

  const caught = isCaught(data.id);
  const img =
    data.sprites.other?.["official-artwork"]?.front_default ||
    data.sprites.front_default;

  async function handleCatchAttempt(e: React.MouseEvent) {
    e.stopPropagation()
    if (!user) {
      toast.show('Please login to catch Pokémon')
      nav('/login', { replace: true, state: { redirect: '/' } })
      return
    }
    if (caught) {
      releaseOne(data.id)
      toast.show('Released 🫗')
      return
    }
    // ⬇️ langsung ke battle
    nav(`/battle/${data.name}`)
  }

  return (
    <button
      onClick={onClick}
      className="group text-left border rounded-2xl p-3 hover:shadow-md transition w-full bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
    >
      <div className="aspect-square w-full grid place-items-center mb-3 bg-gray-50 dark:bg-zinc-700/50 rounded-xl overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={data.name}
            className={`w-9/12 transition ${
              catching ? "animate-pulse" : "group-hover:scale-105"
            }`}
            loading="lazy"
          />
        ) : (
          <div className="skeleton w-1/2 h-1/2" />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            #{String(data.id).padStart(3, "0")}
          </p>
          <h3 className="font-semibold capitalize text-gray-900 dark:text-zinc-100">
            {data.name}
          </h3>
        </div>
        <div className="flex gap-1 flex-wrap justify-end">
          {data.types.map((t) => (
            <span
              key={t.type.name}
              className={`text-[11px] px-2 py-1 rounded-full ${badgeColor(
                t.type.name
              )}`}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          onClick={handleCatchAttempt}
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
    </button>
  );
}
