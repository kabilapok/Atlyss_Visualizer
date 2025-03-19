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
                    img.title = icon.replace(/_/g, ' ');
                    img.setAttribute("draggable", "true");
                    img.classList.add(skillClass, state, "icon");


                    let container = document.getElementById(`${skillClass}-box`);
                    const masteryContainer = document.getElementById("Mastery-box");
                    let passiveContainer = document.getElementById(`${skillClass}-passive-box`);

                    const stateActions = {
                        "Mastery": () => masteryContainer.appendChild(img),
                        "Passive": () => passiveContainer.appendChild(img),
                        "Default": () => container.appendChild(img),
                    };
                    (stateActions[state] || stateActions["Default"])();
                });
            });
        });
    });

function initializeOptions() {
    populateClassOption();
    populateLevelOption();

    getSelectedRace(); // call to get the initial race value
    getSelectedClass(); // call to get the initial class value
    getSelectedLevel(); // call to get the initial level value
}
initializeOptions();

// class selection implementation
function populateClassOption() {
    const classSelect = document.getElementById("class");
    document.querySelectorAll("[data-choice]").forEach(element => {
        let option = document.createElement("option");
        option.value = element.dataset.choice;
        option.textContent = element.dataset.choice;
        classSelect.appendChild(option);
    });
    classSelect.value = "Novice";

};

// Class
function getSelectedClass() {

    const classSelect = document.getElementById("class");
    const classValue = classSelect.value;
    console.log(classValue);

    const classtext = classSelect.options[classSelect.selectedIndex].text;
    console.log(classtext);

    return classValue;

}

document.getElementById("class").addEventListener("change", function () {
    const selectedClass = getSelectedClass(); // getSelectedClass returns the class selected
    if (selectedClass === "Fighter") {
        console.log(`The class modifier is: ${selectedClass} from getSelectedClass()`);
    }
})


// level selection implementation
function populateLevelOption() {
    const levelSelect = document.getElementById("level");

    for (let i = 25; i >= 1; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        levelSelect.appendChild(option);
    };
    

};

// Level
function getSelectedLevel() {
    const selectLevel = document.getElementById("level");
    const levelValue = selectLevel.value;
    console.log(levelValue);

    const levelText = selectLevel.options[selectLevel.selectedIndex].text;
    console.log(`The text is: ${levelText}`);

    return levelValue;
};

document.getElementById("level").addEventListener('change', function () {
    const selectedLevel = getSelectedLevel();
    if (selectedLevel === "20") {
        console.log(`The class modifier is: ${selectedLevel} from getSelectedLevel()`);
    };
});


// Race
function getSelectedRace() {
    const selectElement = document.getElementById("Race");
    const selectedValue = selectElement.value; // Get the value of the selected option
    console.log(`Selected Race value: ${selectedValue}`);

    const selectedText = selectElement.options[selectElement.selectedIndex].text; // Get the text
    console.log(`Selected Race text: ${selectedText}`);

    return selectedValue;
};

document.getElementById("Race").addEventListener("change", function () {
    const selectedRace = getSelectedRace();
    if (selectedRace === "kubold") {
        console.log(`The class modifier is: ${selectedRace} from getSelectedRace()`);
    };
});