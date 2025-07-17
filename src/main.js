import { createAndPlaceIcons } from './Scripts/iconManager.js';
import { loadSkillData } from './Scripts/dataLoader.js';
import { initializeOptions } from './Scripts/optionManager.js';
import { loadAndInitTooltips } from './Scripts/tooltipManager.js';

async function main() {
    const data = await loadSkillData();
    if (!data) return;
    const { iconData } = data;
    createAndPlaceIcons(iconData);
    initializeOptions();
    loadAndInitTooltips();
}
main();
