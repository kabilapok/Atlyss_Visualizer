import { loadSkillData } from './dataLoader.js';
// Generates HTML for skill tooltips
function tooltipData(skill) {
    const rank = skill.ranks?.[0] || {};

    if (!skill || !skill.name) {
        return `<strong>Skill data not available</strong>`;
    }

    // Mastery or Passive skills
    if (skill.name.includes("Mastery") || skill.type === "Passive") {
        return `
        <strong>${skill.name.replace(/_/g, ' ')}</strong>
        ${skill.description ? `<br><em>${skill.description}</em>` : ""}
        <br><br>
        Type: ${skill.type || "N/A"}<br>
        ${rank.pointCost ? `Skill Point Cost: ${rank.pointCost}<br>` : ""}
        `;
    }

    const damageType = skill.damageType || "N/A";
    let damageHTML;

    if (damageType.includes("Strength")) {
        damageHTML = `<span class="damage-strength">${damageType}</span>`;
    } else if (damageType.includes("Mind")) {
        damageHTML = `<span class="damage-mind">${damageType}</span>`;
    } else if (damageType.includes("Dexterity")) {
        damageHTML = `<span class="damage-dexterity">${damageType}</span>`;
    } else {
        damageHTML = damageType;
    }

    // Active/regular skills
    return `
    <strong>${skill.name.replace(/_/g, ' ')}</strong><br>
    <em>${skill.description || ""}</em><br><br>
    Type: ${skill.type || "N/A"}<br>
    Damage Type: ${damageHTML}<br>
    ${rank.castTime !== undefined ? `Cast Time: ${rank.castTime}s<br>` : ""}
    ${rank.cooldown !== undefined ? `Cooldown: ${rank.cooldown}s<br>` : ""}
    ${rank.staminaCost ? `Stamina Cost: ${rank.staminaCost}<br>` : ""}
    ${rank.manaCost ? `Mana Cost: ${rank.manaCost}<br>` : ""}
    ${rank.pointCost ? `Skill Point Cost: ${rank.pointCost}<br>` : ""}
    `;
}

// Loads skill data and attaches Tippy tooltips to skill icons
export async function tippyLoad() {
    const { fighterData, mysticData, banditData, noviceData } = await loadSkillData();

    const allSkills = [
        ...fighterData.Fighter.skills,
        ...mysticData.Mystic.skills,
        ...banditData.Bandit.skills,
        ...noviceData.Novice.skills
    ];

    allSkills.forEach(skill => {
        const icon = document.getElementById(skill.name);
        if (!icon) return;

        icon.setAttribute('data-tippy-content', tooltipData(skill));
        tippy(icon, {
            allowHTML: true,
            placement: 'top-start',
            animation: 'perspective-extreme',
            arrow: false,
            interactive: false,
            followCursor: true,
            duration: [0, 0],
            delay:[0, 100]
        });
    });
}
