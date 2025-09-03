export async function loadSkillData() {
    try {
        const [
            iconData,
            fighterData,
            mysticData,
            banditData,
            noviceData
        ] = await Promise.all([
            fetch("src/data/skills/index.json").then((response) => response.json()),
            fetch("src/data/skills/Fighter.json").then(response => response.json()),
            fetch("src/data/skills/Mystic.json").then(response => response.json()),
            fetch("src/data/skills/Bandit.json").then(response => response.json()),
            fetch("src/data/skills/Novice.json").then(response => response.json())
        ]);
        return { iconData, fighterData, mysticData, banditData, noviceData };
    } catch (error) {
        console.error("Failed to load skill data:", error);
        return null;
    }
}