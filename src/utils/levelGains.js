// Resutlts at level 32 with no investment
// Max Health: 73
// Max Mana: 66
// Max stamina: 28
// Stat Points: 99
// Skill Points: 48
// Attack Power: 4
// Mgk. Power: 2
// Dex Power: 2

export const baseStats = { hp: 20, mp: 15, stam: 10, statPoints: 6, skillPoints: 0, attackPoints: 1, mgkPowerPoints: 1, dexPowerPoints: 1 };

export const levelGains = {

       // 2–10
        2: { hp: 1, mp: 1, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        3: { hp: 2, mp: 1, stam: 0, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        4: { hp: 2, mp: 2, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        5: { hp: 2, mp: 1, stam: 1, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        6: { hp: 2, mp: 2, stam: 1, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        7: { hp: 1, mp: 1, stam: 0, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        8: { hp: 2, mp: 1, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        9: { hp: 2, mp: 2, stam: 0, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        10: { hp: 2, mp: 1, stam: 2, statPoints: 3, skillPoints: 3, attackPoints: 1, mgkPowerPoints: 0, dexPowerPoints: 0 },

        // 11–20
        11: { hp: 2, mp: 1, stam: 0, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        12: { hp: 2, mp: 1, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        13: { hp: 2, mp: 1, stam: 0, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        14: { hp: 1, mp: 0, stam: 1, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        15: { hp: 2, mp: 1, stam: 1, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        16: { hp: 2, mp: 0, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        17: { hp: 1, mp: 1, stam: 1, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        18: { hp: 2, mp: 1, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        19: { hp: 2, mp: 1, stam: 0, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        20: { hp: 1, mp: 2, stam: 2, statPoints: 3, skillPoints: 3, attackPoints: 1, mgkPowerPoints: 0, dexPowerPoints: 1 },

        // 21–32
        21: { hp: 2, mp: 2, stam: 1, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        22: { hp: 1, mp: 2, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        23: { hp: 0, mp: 3, stam: 1, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        24: { hp: 1, mp: 3, stam: 2, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        25: { hp: 1, mp: 3, stam: 1, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        26: { hp: 2, mp: 3, stam: 1, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 1, dexPowerPoints: 0 },
        27: { hp: 1, mp: 2, stam: 0, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        28: { hp: 2, mp: 3, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        29: { hp: 3, mp: 2, stam: 2, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        30: { hp: 2, mp: 3, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 1, mgkPowerPoints: 0, dexPowerPoints: 0 },

        31: { hp: 2, mp: 2, stam: 1, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        32: { hp: 3, mp: 2, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
		
        // 33: { hp: 2, mp: 3, stam: 0, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        // 34: { hp: 3, mp: 2, stam: 1, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        // 35: { hp: 3, mp: 3, stam: 1, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        // 36: { hp: 2, mp: 2, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        // 37: { hp: 3, mp: 2, stam: 0, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        // 38: { hp: 3, mp: 3, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        // 39: { hp: 3, mp: 2, stam: 2, statPoints: 3, skillPoints: 0, attackPoints: 0, mgkPowerPoints: 0, dexPowerPoints: 0 },
        // 40: { hp: 3, mp: 2, stam: 0, statPoints: 3, skillPoints: 3, attackPoints: 1, mgkPowerPoints: 0, dexPowerPoints: 1 },		
    };
