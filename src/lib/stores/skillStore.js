import { writable } from 'svelte/store';
import { loadAllIcons } from '../../utils/iconLoader.js';
import { loadData } from '../../utils/tooltip.js';

function createSkillStore() {
  const { subscribe, update } = writable({
    loadout: {},
    activeSkillbar: Array(12).fill(null),
    passiveSkillbar: [],
    isLoaded: false,
  });

  async function load() {
    const [allIcons, allSkillData] = await Promise.all([loadAllIcons(), loadData()]);
    const grouped = {};
    for (const icon of allIcons) {
      const category = icon.name.includes('Mastery') ? 'Mastery' : icon.category;
      if (!grouped[category]) grouped[category] = [];
      const skillInfo = findSkillInJson(allSkillData, icon.name);
      const fullSkill = skillInfo ? { ...icon, ...skillInfo } : icon;
      grouped[category].push(fullSkill);
    }
    for (const category in grouped) {
      grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    }
    update(s => ({ ...s, loadout: grouped, isLoaded: true }));
  }

  function getSkillFromPayload(state, payload) {
    if (!payload) return null;
    switch (payload.source) {
      case 'loadout':
        return state.loadout[payload.category]?.find(i => i.name === payload.name) || null;
      case 'activeSkillbar':
        return state.activeSkillbar[payload.fromIndex];
      case 'passiveSkillbar':
        return state.passiveSkillbar[payload.fromIndex];
      default:
        return null;
    }
  }

  const immutableRemove = (state, payload) => {
    const newLoadout = { ...state.loadout };
    const newActiveSkillbar = [...state.activeSkillbar];
    let newPassiveSkillbar = [...state.passiveSkillbar];

    switch (payload.source) {
      case 'loadout':
        newLoadout[payload.category] = newLoadout[payload.category].filter(i => i.name !== payload.name);
        break;
      case 'activeSkillbar':
        newActiveSkillbar[payload.fromIndex] = null;
        break;
      case 'passiveSkillbar':
        newPassiveSkillbar = newPassiveSkillbar.filter((_, idx) => idx !== payload.fromIndex);
        break;
    }
    return { loadout: newLoadout, activeSkillbar: newActiveSkillbar, passiveSkillbar: newPassiveSkillbar };
  };

  const immutableAddToLoadout = (state, skill) => {
    if (!skill) return state.loadout;
    const newLoadout = { ...state.loadout };
    const cat = skill.name.includes('Mastery') ? 'Mastery' : skill.class;
    const targetCategory = newLoadout[cat] ? [...newLoadout[cat], skill] : [skill];
    targetCategory.sort((a, b) => a.name.localeCompare(b.name));
    newLoadout[cat] = targetCategory;
    return newLoadout;
  };

  function moveToActiveSkillbar(payload, toIndex) {
    update(s => {
      const skillToMove = getSkillFromPayload(s, payload);
      if (!skillToMove) return s;

      // REDIRECT: If a passive is dropped on the active bar, move it to the passive bar instead.
      if (skillToMove.type === 'Passive') {
        const { loadout, activeSkillbar, passiveSkillbar } = immutableRemove(s, payload);
        const newPassiveSkillbar = passiveSkillbar.find(sk => sk.name === skillToMove.name)
          ? passiveSkillbar 
          : [...passiveSkillbar, skillToMove];
        return { ...s, loadout, activeSkillbar, passiveSkillbar: newPassiveSkillbar };
      }

      // It's an active skill.
      if (payload.source === 'activeSkillbar') {
        // SWAP: Move within the active skillbar.
        const fromIndex = payload.fromIndex;
        if (fromIndex === toIndex) return s;
        const newActiveSkillbar = [...s.activeSkillbar];
        [newActiveSkillbar[fromIndex], newActiveSkillbar[toIndex]] = [newActiveSkillbar[toIndex], newActiveSkillbar[fromIndex]];
        return { ...s, activeSkillbar: newActiveSkillbar };
      } else {
        // REPLACE: Move from loadout or passive bar.
        const displacedSkill = s.activeSkillbar[toIndex];
        const { loadout, activeSkillbar, passiveSkillbar } = immutableRemove(s, payload);
        const newLoadout = immutableAddToLoadout({loadout}, displacedSkill);
        activeSkillbar[toIndex] = skillToMove;
        return { ...s, loadout: newLoadout, activeSkillbar, passiveSkillbar };
      }
    });
  }

  function moveToPassiveSkillbar(payload) {
    update(s => {
      const skillToMove = getSkillFromPayload(s, payload);
      if (!skillToMove || skillToMove.type !== 'Passive') return s;

      const { loadout, activeSkillbar, passiveSkillbar } = immutableRemove(s, payload);
      const newPassiveSkillbar = passiveSkillbar.find(sk => sk.name === skillToMove.name)
        ? passiveSkillbar // Prevent duplicates
        : [...passiveSkillbar, skillToMove];

      return { ...s, loadout, activeSkillbar, passiveSkillbar: newPassiveSkillbar };
    });
  }

  function moveToLoadout(payload) {
    update(s => {
      const skillToMove = getSkillFromPayload(s, payload);
      if (!skillToMove) return s;

      const { loadout, activeSkillbar, passiveSkillbar } = immutableRemove(s, payload);
      const newLoadout = immutableAddToLoadout({loadout}, skillToMove);

      return { ...s, loadout: newLoadout, activeSkillbar, passiveSkillbar };
    });
  }

  return { subscribe, load, moveToActiveSkillbar, moveToPassiveSkillbar, moveToLoadout };
}

function findSkillInJson(allSkillData, skillName) {
  for (const classData of Object.values(allSkillData)) {
    if (classData.skills && classData.skills[skillName]) {
      return { ...classData.skills[skillName], class: classData.name };
    }
  }
  return null;
}

export const skillStore = createSkillStore();
