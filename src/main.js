//DragnDrop
function dragstartHandler(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function dragoverHandler(ev) {
    ev.preventDefault();    
}

function dropHandler(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text/plain");
    ev.target.appendChild(document.getElementById(data));
}

let statsData = {};
let iconData = {};

Promise.all([fetch("data.json").then((response) => response.json()),
            fetch("Stats.json").then(response => response.json()) ])

// icon implementation
    .then(([data, baseStats]) => {

       

        iconData = data;
        console.log(iconData);


        statsData = baseStats;
        console.log(statsData);

        


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

                    //dragndrop
                    img.addEventListener("dragstart", dragstartHandler);

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


        //stats implementation
        const Mainstats = baseStats["Main-stats"];
        console.log(`Main stats: ${JSON.stringify(Mainstats, null, 2)}`);

        const Substats = baseStats["Sub-stats"];
        console.log(`Sub stats: ${JSON.stringify(Substats, null, 2)}`);

        Object.entries(Mainstats).forEach(([statName, statValue]) => {
            const statContainer = document.getElementById(`${statName}-value`);
            statContainer.textContent = statValue;
        });

        Object.entries(Substats).forEach(([category, stats]) => {
            Object.entries(stats).forEach(([statName, statValue]) => {
                const statContainer = document.getElementById(`${statName}-value`);

                if (statName === "Evasion") {
                    statValue = statValue.toFixed(2); 
                } else if (statName === "Mov-spd") {
                    statValue = statValue.toFixed(1); 
                }
                statContainer.textContent = statValue;

            })

        })
        updateHealth(getSelectedLevel());


    });


function initializeOptions() {
    populateClassOption();
    populateLevelOption();

    populateHotbarslot();

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

document.getElementById("level").addEventListener('change', function () {
    updateHealth(this.value);
})

function updateHealth(amount) {
    let healthValue = Number(statsData["Main-stats"].Health + (Number(amount) - 1) * 1.625).toFixed(0);
    document.getElementById("Health-value").textContent = healthValue;
}

//populateHotbar for dragNdrop
function populateHotbarslot() {
    document.querySelectorAll(".hotbar-slot").forEach(slot => {
        slot.setAttribute("ondrop", "dropHandler(event)");
        slot.setAttribute("ondragover", "dragoverHandler(event)");
    })   
}