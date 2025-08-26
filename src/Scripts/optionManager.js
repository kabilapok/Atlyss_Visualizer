export function populateLevelOption(min = 1, max = 40, defaultLevel = 40) {
    const levelContainer = document.getElementById("level-container");
    if (!levelContainer) return;

    const input = document.createElement("input");
    input.type = "number";
    input.id = "levelInput";
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
    const selectElement = document.querySelectorAll('input[name="race"]');
    for (const input of selectElement) {
        if (input.checked) {
            return input.value;
        }
    }
    return null; 
}

export function getSelectedClass() {
    const classSelect = document.querySelectorAll('input[name="skillclass"]');
    for (const input of classSelect) {
        if (input.checked) {
            return input.value;
        }
    }
    return null; 
}

export function getSelectedLevel(callback) {
    const input = document.getElementById("levelInput");
    if (!input) return;

    if (typeof callback === "function") {
        callback(Number(input.value));
        input.addEventListener("change", function () {
            callback(Number(this.value));
        });
    }
}

export function getSelectedLevelValue() {
    const input = document.getElementById("levelInput");
    if (!input) return null;
    return Number(input.value);
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


    populateLevelOption();
    updateRaceimg(getSelectedRace());
    getSelectedRace();
    getSelectedClass();
    getSelectedLevelValue();
    getSelectedLevel();

    document.querySelectorAll('input[name="race"]').forEach(input => {
        input.addEventListener('change', () => {
            updateRaceimg(getSelectedRace());
        });
    });
    


    document.querySelectorAll('.icon-container').forEach(box => box.classList.add('hidden'));


    document.querySelectorAll('input[name="skillclass"]').forEach(input => {
        input.addEventListener('change', () => {
            const selectedClass = getSelectedClass();
            const resultBoxes = document.querySelectorAll('.icon-container');
            resultBoxes.forEach(box => box.classList.add('hidden'));
            const resultClass = document.getElementById(selectedClass);
            if (resultClass) {
                resultClass.classList.remove('hidden');
            }
        });
    })

    console.log("Initial level:", getSelectedLevelValue());

    document.getElementById("levelInput").addEventListener("change", () => {
        console.log("Level changed to:", getSelectedLevelValue());
    });
    
   
}