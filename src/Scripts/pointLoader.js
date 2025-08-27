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

function calculateTotalSkillPoints(level) {
    // 0 points at level 1.
    // From level 2 onwards, points increment by 3 every 2 levels.
    if (level < 2) return 0;
    return Math.floor((level - 2) / 2 + 1) * 3;
}

function calculateTotalStatPoints(level) {
    // 6 points at level 1, +3 for each level after
    if (level < 1) return 0;
    return 6 + (level - 1) * 3;
}

export async function loadPoints() {
    await buildSkillPointMap();

    const pointDisplay = document.getElementById("points-display");
    const totalPoints = document.getElementById("total-points");
    const usedPoints = document.getElementById("used-points");
    const remainingPoints = document.getElementById("remaining-points");

    // Stat points containers 
    const statTotalPoints = document.getElementById("stat-total-points");
    const statUsedPoints = document.getElementById("stat-used-points");
    const statRemainingPoints = document.getElementById("stat-remaining-points");

    if (!pointDisplay || !totalPoints || !usedPoints || !remainingPoints) return;

    function updatePoints(level) {
        // Skill points
        const totalSkill = calculateTotalSkillPoints(level);
        let usedSkill = 0;
        document.querySelectorAll('.icon.selected').forEach(icon => {
            const iconId = icon.id;
            usedSkill += skillPointMap[iconId] ?? 1;
        });
        const remainingSkill = totalSkill - usedSkill;

        totalPoints.textContent = totalSkill;
        usedPoints.textContent = usedSkill;
        remainingPoints.textContent = remainingSkill >= 0 ? remainingSkill : 0;
        remainingPoints.style.color = remainingSkill < 0 ? "red" : "";

        // Stat points
        if (statTotalPoints && statUsedPoints && statRemainingPoints) {
            const totalStat = calculateTotalStatPoints(level);
            let usedStat = 0;

            // You can implement your own logic for usedStat, e.g. count assigned stat points

            statTotalPoints.textContent = totalStat;
            statUsedPoints.textContent = usedStat;
            statRemainingPoints.textContent = totalStat - usedStat;
            statRemainingPoints.style.color = (totalStat - usedStat) < 0 ? "red" : "";
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
