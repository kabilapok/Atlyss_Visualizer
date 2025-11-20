
export function populateClassOption() {
    const classSelect = document.getElementById("class");
    if (!classSelect) return;

    let hasNovice = false;
    document.querySelectorAll("[data-choice]").forEach(element => {
        let option = document.createElement("option");
        option.value = element.dataset.choice;
        option.textContent = element.dataset.choice;
        if (option.value === "Novice") hasNovice = true;
        classSelect.appendChild(option);
    });

    if (hasNovice) {
        classSelect.value = "Novice";
    }
   
}

export function populateLevelOption(min = 1, max = 40, defaultLevel = 40) {
    const levelContainer = document.getElementById("level");
    if (!levelContainer) return;

    // Create input element
    const input = document.createElement("input");
    input.type = "number";
    input.id = "level";
    input.min = min;
    input.max = max;
    input.value = defaultLevel;

    // restrict typing beyond min/max
    input.addEventListener("input", () => {
        if (input.value < min) input.value = min;
        if (input.value > max) input.value = max;
    });

    levelContainer.appendChild(input);
}

export function getSelectedRace() {
    const selectElement = document.getElementById("Race");
    return selectElement.value;
}

export function getSelectedClass() {
    const classSelect = document.getElementById("class");
    return classSelect.value;
}

export function getSelectedLevel(callback) {
    const select = document.getElementById("level");

    // Fire callback immediately with current value (after population)
    if (typeof callback === "function") {
        callback(select.value);
    }

    // Add event listener for future changes
    select.addEventListener("change", function () {
        if (typeof callback === "function") {
            callback(this.value);
        }
    });
    
}

export function updateRaceimg(selected) {
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

export function initializeOptions() {


    populateClassOption();
    populateLevelOption();
    updateRaceimg(getSelectedRace());
    getSelectedRace();
    getSelectedClass();
    getSelectedLevel();
    document.getElementById("Race").addEventListener('change', function () {
        updateRaceimg(this.value);
    });


    document.querySelectorAll('.icon-container').forEach(box => box.classList.add('hidden'));

    document.getElementById("class").addEventListener("change", function () {
        const selectedClass = getSelectedClass();
        const resultBoxes = document.querySelectorAll('.icon-container');
        resultBoxes.forEach(box => box.classList.add('hidden'));

        const resultClass = document.getElementById(selectedClass);
        if (resultClass) {
            resultClass.classList.remove('hidden');
        }
    });
}