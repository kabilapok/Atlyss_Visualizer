export function createAndPlaceIcons(iconData) {

    Object.entries(iconData).forEach(([skillClass, types]) => {
        Object.entries(types).forEach(([state, icons]) => {
            icons.forEach((icon) => {
                const img = document.createElement("img");
                img.src = `../assets/${skillClass}-icons/${icon}.png`;
                img.id = icon;
                img.alt = `${icon}.png`;
                //img.title = icon.replace(/_/g, ' ');
                img.setAttribute("draggable", "true");
                img.classList.add(skillClass, state, "icon");
                img.onerror = function () {
                    this.src = "../assets/order_icon.svg";
                };

                img.dataset.originalContainer = `${skillClass}-box`;


                const container = document.getElementById(`${skillClass}-box`);
                const masteryContainer = document.getElementById("Mastery-box");
                const passiveContainer = document.getElementById(`${skillClass}-passive-box`);

                const stateActions = {
                    "Mastery": () => masteryContainer.appendChild(img),
                    "Passive": () => passiveContainer.appendChild(img),
                    "Default": () => container.appendChild(img),
                };
                (stateActions[state] || stateActions["Default"])();
            });
        });
    });

}