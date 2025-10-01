import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth";
import { readJSON, writeJSON } from "../../utils/storage";

export type SavedPokemon = {
  id: number;
  name: string;
  image: string | null;
  types: string[];
  caughtAt: number;
  nickname?: string;
};

type InventoryCtx = {
  items: SavedPokemon[];
  isCaught: (id: number) => boolean;
  catchOne: (p: SavedPokemon) => void;
  releaseOne: (id: number) => void;
  clearAll: () => void;
};

const InventoryContext = createContext<InventoryCtx | null>(null);
const keyFor = (userId: string) => `pokedex.inventory.${userId}`;

export function InventoryProvider({ children }: { children: React.ReactNode }) {

  const { user } = useAuth();

  const [items, setItems] = useState<SavedPokemon[]>([]);
  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }
    setItems(readJSON<SavedPokemon[]>(keyFor(user.id), []));
  }, [user]);

  const value = useMemo<InventoryCtx>(
    () => ({
      items,
      isCaught: (id) => items.some((p) => p.id === id),
      catchOne: (p) => {
        if (!user || items.some((x) => x.id === p.id)) return;
        const next = [...items, p];
        setItems(next);
        writeJSON(keyFor(user.id), next);
      },
      releaseOne: (id) => {
        if (!user) return;
        const next = items.filter((p) => p.id !== id);
        setItems(next);
        writeJSON(keyFor(user.id), next);
      },
      clearAll: () => {
        if (!user) return;
        setItems([]);
        writeJSON(keyFor(user.id), []);
      },
    }),
    [items, user]
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx)
    throw new Error("useInventory must be used within InventoryProvider");
  return ctx;
}
