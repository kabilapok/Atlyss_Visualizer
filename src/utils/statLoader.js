import { baseStats, levelGains } from '../utils/levelGains.js';

export function checkStats(level) {
  let total = { ...baseStats };
  for (let i = 2; i <= level; i++) {
    const gain = levelGains[i];
    if (gain) {
      for (const stat in gain) {
        total[stat] += gain[stat];
      }
    }
  }
  return total;
}
