Promise.all([fetch("data/skills/index.json").then((response) => response.json()),
    fetch("data/skills/Fighter.json").then(response => response.json()),

Promise.all([fetch("data.json").then((response) => response.json()),

        // icon implementation
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

                    img.dataset.originalContainer = `${skillClass}-box`;


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


        const skillData = {
            ...fighterData.Active,
            ...mysticData.Active,

            ...fighterData.Passive,
            ...mysticData.Passive,

        
        //tooltip implementation
        //Create a div(box) that willn be attributed to each icons
        Object.entries(skillData).forEach(([skillName, skillData]) => {

                document.body.appendChild(tooltip);

                const moveTooltip = (e) => {
                    tooltip.style.left = `${e.pageX + -150}px`;
                    tooltip.style.top = `${e.pageY + -150}px`;
                };

                moveTooltip(event);

                icon.addEventListener('mouseleave', () => {
                    tooltip.remove();


    });


function initializeOptions() {
    populateClassOption();
    populateLevelOption();

    updateRaceimg(getSelectedRace());

    // only for future utility
    getSelectedRace(); // get the initial race value
    getSelectedClass(); // get the initial class value
    getSelectedLevel(); // get the initial level value
}
initializeOptions();


// Race
function getSelectedRace() {
    const selectElement = document.getElementById("Race");
    const selectedValue = selectElement.value; // Get the value of the selected option
    console.log(`Selected Race value: ${selectedValue}`);

    const selectedText = selectElement.options[selectElement.selectedIndex].text; // Get the text
    console.log(`Selected Race text: ${selectedText}`);

    return selectedValue;
};

function updateRaceimg(selected) {
    const container = document.getElementById("Race-img");

    container.innerHTML = '';

    if (selected) {
        const raceId = document.createElement("img");
        raceId.src = `../assets/Race-icons/rcIco_${selected}.png`;
        raceId.id = selected;
        raceId.alt = `${selected}.png`;
        container.appendChild(raceId);
    }

}

document.getElementById("Race").addEventListener('change', function () {
    updateRaceimg(this.value);
})
    
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


    //Show current class icons and hide non current ones
    const resultBox = document.querySelectorAll('.icon-container');
    resultBox.forEach(box => box.style.display = 'none');

    const resultClass = document.getElementById(`${selectedClass}`);
    if (resultClass ) {
        resultClass.style.display = "flex";
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


function generateTooltipContent(skillName, skillData) {

