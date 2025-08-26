import { loadSkillData } from './dataLoader.js';

const tooltip = document.getElementById("tooltip");

export async function loadAndInitTooltips() {
    const { fighterData, mysticData, banditData, noviceData } = await loadSkillData();

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

        const showTooltip = (e) => {
            tooltip.innerHTML = tooltipData(skill);
            tooltip.style.opacity = 1;
            positionTooltip(e);
        };

        const moveTooltip = (e) => {
            positionTooltip(e);
        };

        const hideTooltip = () => {
            tooltip.style.opacity = 0;
        };

        const positionTooltip = (e) => {
            const tooltipRect = tooltip.getBoundingClientRect();
            let left = e.pageX + 10;
            let top = e.pageY + 10;

            // Prevent tooltip from going off the right/bottom edge
            if (left + tooltipRect.width > window.innerWidth) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (top + tooltipRect.height > window.innerHeight) {
                top = window.innerHeight - tooltipRect.height - 10;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        };

        icon.addEventListener('mouseenter', showTooltip);
        icon.addEventListener('mousemove', moveTooltip);
        icon.addEventListener('mouseleave', hideTooltip);
    });
}

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