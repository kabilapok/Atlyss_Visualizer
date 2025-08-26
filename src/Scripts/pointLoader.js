import { getSelectedLevel } from './optionManager.js';
import { loadSkillData } from './dataLoader.js';

let skillPointMap = {};

// Build a map of icon id to pointCost from all skills
async function buildSkillPointMap() {
    const { fighterData, mysticData, banditData, noviceData } = await loadSkillData();
    const allSkills = [
        ...fighterData.Fighter.skills,
        ...mysticData.Mystic.skills,
        ...banditData.Bandit.skills,
        ...noviceData.Novice.skills
    ];
    skillPointMap = {};
    allSkills.forEach(skill => {
        // Use skill.name as icon id
        const iconId = skill.name;
        const pointCost = skill.ranks?.[0]?.pointCost ?? 1;
        skillPointMap[iconId] = pointCost;
    });
}

function calculateTotalPoints(level) {
    // 0 points at level 1.
    // From level 2 onwards, points increment by 3 every 2 levels.
    if (level < 2) return 0;
    return Math.floor((level - 2) / 2 + 1) * 3;
}

export async function loadPoints() {
    await buildSkillPointMap();

    const pointDisplay = document.getElementById("points-display");
    const totalPoints = document.getElementById("total-points");
    const usedPoints = document.getElementById("used-points");
    const remainingPoints = document.getElementById("remaining-points");

    if (!pointDisplay || !totalPoints || !usedPoints || !remainingPoints) return;

    function updatePoints(level) {
        const total = calculateTotalPoints(level);

        // Sum up the pointCost for all selected icons
        let used = 0;
        document.querySelectorAll('.icon.selected').forEach(icon => {
            const iconId = icon.id;
            used += skillPointMap[iconId] ?? 1;
        });

        const remaining = total - used;

        totalPoints.textContent = total;
        usedPoints.textContent = used;
        remainingPoints.textContent = remaining >= 0 ? remaining : 0;

        if (remaining < 0) {
            remainingPoints.style.color = "red";
        } else {
            remainingPoints.style.color = "";
        }
    }

    // Initial + listen for changes
    getSelectedLevel((level) => {
        updatePoints(level);
    });

    // Recalculate when icons are clicked
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('icon')) {
            e.target.classList.toggle('selected');
            getSelectedLevel((level) => {
                updatePoints(level);
            });
        }
    });
}
