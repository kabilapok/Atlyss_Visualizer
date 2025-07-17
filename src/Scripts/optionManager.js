export function populateClassOption() {
    const classSelect = document.getElementById("class");
    document.querySelectorAll("[data-choice]").forEach(element => {
        let option = document.createElement("option");
        option.value = element.dataset.choice;
        option.textContent = element.dataset.choice;
        classSelect.appendChild(option);
    });
    classSelect.value = "Novice";
}

export function populateLevelOption() {
    const levelSelect = document.getElementById("level");
    for (let i = 25; i >= 1; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        levelSelect.appendChild(option);
    }
}

export function getSelectedRace() {
    const selectElement = document.getElementById("Race");
    return selectElement.value;
}

export function getSelectedClass() {
    const classSelect = document.getElementById("class");
    return classSelect.value;
}

export function getSelectedLevel() {
    const selectLevel = document.getElementById("level");
    return selectLevel.value;
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
    document.getElementById("class").addEventListener("change", function () {
        const selectedClass = getSelectedClass();
        const resultBox = document.querySelectorAll('.icon-container');
        resultBox.forEach(box => box.style.display = 'none');
        const resultClass = document.getElementById(`${selectedClass}`);
        if (resultClass) {
            resultClass.style.display = "flex";
        }
    });
}