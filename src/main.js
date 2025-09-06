import { createAndPlaceIcons } from './Scripts/iconManager.js';
import { loadSkillData } from './Scripts/dataLoader.js';
import { initializeOptions } from './Scripts/optionManager.js';
import { tippyLoad } from './Scripts/tippyTooltip.js';
import { loadPoints } from './Scripts/pointLoader.js';
import { loadStats } from './Scripts/statLoader.js';

async function main() {
    const data = await loadSkillData();
    if (!data) return;
    const { iconData } = data;
    createAndPlaceIcons(iconData);
    initializeOptions();
    tippyLoad();
    loadPoints();
    loadStats();
}
main();
