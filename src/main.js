// icon implementation
document.addEventListener("DOMContentLoaded", () => {
    fetch("src/data.json")
        .then((response) => response.json())
        .then((data) => {

            Object.entries(data).forEach(([skillClass, types]) => {
                Object.entries(types).forEach(([state, icons]) => {
                    icons.forEach((icon) => {
                        const img = document.createElement("img");
                        img.src = `assets/${skillClass}-icons/${icon}.png`;
                        img.id = icon;
                        img.alt = `${icon}.png`;
                        img.title = icon; // gives image names on hover
                        img.setAttribute("draggable", "true");
                        img.classList.add(skillClass, state, "icon");

                        let container = document.getElementById(`${skillClass}-box`);
                        if (container) {
                            container.appendChild(img);
                        }

                    })
                })
            })
        })
        .catch(error => console.log("Error loading images:", error));
});


