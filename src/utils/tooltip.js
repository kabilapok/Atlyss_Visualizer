export async function loadData() {
  try {
    const responses = await Promise.all([
      fetch('/skills-data/Novice.json'),
      fetch('/skills-data/Fighter.json'),
      fetch('/skills-data/Mystic.json'),
      fetch('/skills-data/Bandit.json')
    ]);

    const data = await Promise.all(responses.map(r => r.json()));
    const [Novice, Fighter, Mystic, Bandit] = data;

    return { Novice, Fighter, Mystic, Bandit };
  } catch (error) {
    console.error("Skill Loading Error:", error);
    return {};
  }
}

export function createTooltipContent(skill) {
  if (!skill) return `<div style="color:red;">Skill data missing</div>`;

  const rank = skill.ranks?.[0];

  if (skill.name.includes("Mastery") || skill.type === 'Passive') {
    return `
      <div class="tooltip-skill">
        <div class="tooltip-header">
          <span class="tooltip-name">${skill.name}</span>
          <span class="tooltip-type">${skill.type}</span>
        </div>

        <div class="tooltip-description">
          ${skill.description}
        </div>

        <div class="tooltip-stats">
        ${rank.pointCost ? `<div><strong>Point Cost:</strong> ${rank.pointCost}</div>` : ""}
        ${rank.level ? `<div><strong>Requires Level:</strong> ${rank.level}</div>` : ""}
        </div>

      </div>  
      `;
    
  };

  
 return `
    <div class="tooltip-skill">
      <div class="tooltip-header">
        <span class="tooltip-name">${skill.name}</span>
        <span class="tooltip-type">${skill.type}</span>
      </div>

      <div class="tooltip-description">
        ${skill.description}
      </div>

      <div class="tooltip-stats">
        ${rank.pointCost ? `<div><strong>Point Cost:</strong> ${rank.pointCost}</div>` : ""}
        ${rank.level ? `<div><strong>Requires Level:</strong> ${rank.level}</div>` : ""}
        ${rank.castTime ? `<div><strong>Cast Time:</strong> ${rank.castTime}</div>` : ""}
        ${rank.cooldown ? `<div><strong>Cooldown:</strong> ${rank.cooldown}</div>` : ""}

        ${skill.damageType ? `<div><strong>Damage type:</strong> ${skill.damageType}</div>` : ""}
        ${rank.manaCost ? `<div><strong>Mana:</strong> ${rank.manaCost}</div>` : ""}
        ${rank.staminaCost ? `<div><strong>Stamina:</strong> ${rank.staminaCost}</div>` : ""}
        ${rank.healthCost ? `<div><strong>Health:</strong> ${rank.healthCost}</div>` : ""}
        ${rank.itemCost ? `<div><strong>Item Cost:</strong> ${rank.itemCost}</div>` : ""}
      </div>
    </div>
  `;
}
