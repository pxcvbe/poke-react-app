export const CAPTURE_CHANCE = 0.35;
export const CAPTURE_DELAY_MS = 900;

export type Ball = { 
  key: string; 
  label: string; 
  multiplier: number; 
  emoji: string 
}

export const BALLS: Ball[] = [
  { key: 'poke',  label: 'Poke Ball',  multiplier: 1.0, emoji: '⚪' },
  { key: 'great', label: 'Great Ball', multiplier: 1.5, emoji: '🔵' },
  { key: 'ultra', label: 'Ultra Ball', multiplier: 2.0, emoji: '🟡' },
]

export const DEFAULT_BALL_KEY = 'poke';

export function getBallByKey(key: string): Ball { 
  return BALLS.find(b => b.key === key) || BALLS[0] 
}

export function effectiveChance(base: number, multiplier: number) { 
  return Math.min(0.95, Math.max(0, base*multiplier)) 
}

export async function tryCapture(prob: number, multiplier: number = 1) { 
  await new Promise(r => setTimeout(r, CAPTURE_DELAY_MS)); return Math.random() < effectiveChance(prob, multiplier) 
}
