import { loadSkillData } from './dataLoader.js';

const tooltip = document.getElementById("tooltip");

export async function loadAndInitTooltips() {
    const { iconData, fighterData, mysticData, banditData, noviceData } = await loadSkillData();

    const allSkills = [
        ...fighterData.Fighter.skills,
        ...mysticData.Mystic.skills,
        ...banditData.Bandit.skills,
        ...noviceData.Novice.skills
    ];

    tooltipLoader(allSkills);
}

function tooltipLoader(skills) {
    skills.forEach(skill => {
        const icon = document.getElementById(skill.name);
        if (!icon) return;

        icon.addEventListener('mouseenter', (e) => {
            tooltip.innerHTML = tooltipData(skill);
            tooltip.style.opacity = 1;
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
        });

        icon.addEventListener('mousemove', (e) => {
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
        });

        icon.addEventListener('mouseleave', () => {
            tooltip.style.opacity = 0;
        });
    });
}

function tooltipData(skill) {
    const rank = skill.ranks?.[0] || {};
    return `
    <strong>${skill.name}</strong><br>
    <em>${skill.description}</em><br><br>
    Damage Type: ${skill.damageType || "N/A"}<br>
    Type: ${skill.type || "N/A"}<br>
    ${rank.castTime !== undefined ? `Cast Time: ${rank.castTime}s<br>` : ""}
    ${rank.cooldown !== undefined ? `Cooldown: ${rank.cooldown}s<br>` : ""}
    ${rank.staminaCost ? `Stamina Cost: ${rank.staminaCost}<br>` : ""}
    ${rank.manaCost ? `Mana Cost: ${rank.manaCost}<br>` : ""}
    `;
}