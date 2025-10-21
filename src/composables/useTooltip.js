import novice from '../assets/skills-data/Novice.json';
import fighter from '../assets/skills-data/Fighter.json';
import mystic from '../assets/skills-data/Mystic.json';
import bandit from '../assets/skills-data/Bandit.json';

const allClasses = {
  Novice: novice,
  Fighter: fighter,
  Mystic: mystic,
  Bandit: bandit,
};

export function useTooltip() {
  function getTooltip(skill) {
    if (!skill?.name) return 'Unknown skill';

    // Step 1: Try the given origin
    let origin = skill.origin;
    let classData = origin ? allClasses[origin] : null;

    // Step 2: Fallback to Novice if origin is missing or invalid
    if (!classData || !classData.skills?.[skill.name]) {
      origin = 'Novice';
      classData = allClasses[origin];
    }

    // Step 3: Check if the skill exists in Novice
    const data = classData?.skills?.[skill.name];
    if (!data) return 'No data available';

    const rank = data.ranks?.[0];
    if (!rank) return 'No rank data available';

    // Simple HTML escape function
    function escapeHtml(str) {
      return (
        String(str)
          .replace(/&/g, '&amp;')
          // .replace(/</g, '&lt;')
          // .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;')
      );
    }

    return `
      <b style="color: gold;">${escapeHtml(data.name)}</b><br>
      <i>${escapeHtml(data.description)}</i><br>
      <br>
      <span>Type:</span> ${escapeHtml(data.type)}<br>
      <span>Damage Type:</span> ${escapeHtml(data.damageType)}<br>
      ${rank.staminaCost ? `Stamina Cost: ${escapeHtml(rank.staminaCost)}<br>` : ''}
      ${rank.manaCost && rank.manaCost > 0 ? `<span style="color: violet;">Mana Cost:</span> ${escapeHtml(rank.manaCost)}<br>` : ''}
      <span>Cast time:</span> ${escapeHtml(rank.castTime)}<em>sec</em><br>
      <span style="color: lightblue;">Cooldown:</span> ${escapeHtml(rank.cooldown)}<em>sec</em><br>
      <span>Skill Point Cost:</span> ${escapeHtml(rank.pointCost)}<br>
      <span style="color: lime;">Level Required:</span> ${escapeHtml(rank.level)}
    `;
  }

  return { getTooltip };
}
