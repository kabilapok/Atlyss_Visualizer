import { createAndPlaceIcons } from './iconManager.js';
import { loadSkillData } from './dataLoader.js';
import { initializeOptions } from './optionManager.js';
import { tippyLoad } from './tippyTooltip.js';

async function main() {
    try {
        const data = await loadSkillData();
        if (!data) return;


        const { iconData } = data;
        createAndPlaceIcons(iconData);


        await Promise.all([
            initializeOptions(),
            tippyLoad(),
        ]);

    } catch (error) {
        console.error('Error in main():', error.message, error.stack);
    }
}
main();
