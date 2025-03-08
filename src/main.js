// icon implementation
fetch("data.json")
    .then((response) => response.json())
    .then((data) => {

        Object.entries(data).forEach(([skillClass, types]) => {
            Object.entries(types).forEach(([state, icons]) => {
                icons.forEach((icon) => {
                    const img = document.createElement("img");
                    img.src = `../assets/${skillClass}-icons/${icon}.png`;
                    img.id = icon;
                    img.alt = `${icon}.png`;
                    img.title = icon; // gives image names on hover
                    img.setAttribute("draggable", "true");
                    img.classList.add(skillClass, state, "icon");

                    let container = document.getElementById(`${skillClass}-box`);
                    if (container) {
                        container.appendChild(img);
                    }

                });
            });
        });
    });


// class selection implementation
const classSelect = document.getElementById("class");
document.querySelectorAll("[data-choice]").forEach(element => {
    let option = document.createElement("option");
    option.value = element.dataset.choice;
    option.textContent = element.dataset.choice;
    classSelect.appendChild(option);
});

// level selection implementation
const levelSelect = document.getElementById("level");
function populateLevelOption() {
    for (let i = 25; i >= 1; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        levelSelect.appendChild(option);
    };
};
populateLevelOption();