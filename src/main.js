import { createAndPlaceIcons } from './Scripts/iconManager.js';
import { loadSkillData } from './Scripts/dataLoader.js';
import { initializeOptions } from './Scripts/optionManager.js';
import { tippyLoad } from './Scripts/tippyTooltip.js';
import { darkModeOption } from './Scripts/websiteDarkMode.js'

async function main() {
    try {
        const data = await loadSkillData();
        if (!data) return;


        const { iconData } = data;
        createAndPlaceIcons(iconData);


        await Promise.all([
            darkModeOption(),
            initializeOptions(),
            tippyLoad(),
        ]);

    } catch (error) {
        console.error('Error in main():', error.message, error.stack);
    }
}
main();
