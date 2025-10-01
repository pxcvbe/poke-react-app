import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BALLS, DEFAULT_BALL_KEY, getBallByKey } from "../../config/capture";

type BallCtx = {
  key: string;
  setKey: (k: string) => void;
  multiplier: number;
  label: string;
  emoji: string;
  list: { key: string; label: string; multiplier: number; emoji: string }[];
};

const BallContext = createContext<BallCtx | null>(null);
const STORAGE_KEY = "pokedex.ball";

export function BallProvider({ children }: { children: React.ReactNode }) {

  const [key, setKey] = useState<string>(DEFAULT_BALL_KEY);
  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) setKey(s);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {}
  }, [key]);

  const v = useMemo<BallCtx>(() => {
    const b = getBallByKey(key);
    return {
      key,
      setKey,
      multiplier: b.multiplier,
      label: b.label,
      emoji: b.emoji,
      list: BALLS,
    };
  }, [key]);
  
  return <BallContext.Provider value={v}>{children}</BallContext.Provider>;
}
export function useBall() {
  const ctx = useContext(BallContext);
  if (!ctx) throw new Error("useBall must be used within BallProvider");
  return ctx;
}
