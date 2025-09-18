export async function loadSkillData() {
    try {
        const [
            iconData,
            fighterData,
            mysticData,
            banditData,
            noviceData
        ] = await Promise.all([
            fetch("data/skills-data/index.json").then((response) => response.json()),
            fetch("data/skills-data/Fighter.json").then(response => response.json()),
            fetch("data/skills-data/Mystic.json").then(response => response.json()),
            fetch("data/skills-data/Bandit.json").then(response => response.json()),
            fetch("data/skills-data/Novice.json").then(response => response.json())
        ]);
        return { iconData, fighterData, mysticData, banditData, noviceData };
    } catch (error) {
        console.error("Failed to load skill data:", error);
        return null;
    }
}