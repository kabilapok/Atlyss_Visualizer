export function initializeOptions() {
    populateLevelOption();

    // Use the universal manager on the whole profile
    getInputs(".profile", values => {
        updateRaceimg(values.race);
        updateClassDisplay(values.skillclass);
        updateProfile(values); 
    });
}

// Create the level input
function populateLevelOption(min = 1, max = 40, defaultLevel = 40) {
    const levelContainer = document.getElementById("level-container");
    if (!levelContainer) return;

    const input = document.createElement("input");
    input.type = "number";
    input.id = "levelInput";
    input.name = "level"; // <-- important for getInputs
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

// Universal input manager
export function getInputs(containerSelector, onChangeCallback) {
    const container =
        typeof containerSelector === "string"
            ? document.querySelector(containerSelector)
            : containerSelector;

    if (!container) return {};

    function extractAllValues() {
        const values = {};
        const inputs = container.querySelectorAll("input, select, textarea");

        inputs.forEach(input => {
            if (!input.name) return; // skip unnamed inputs

            if (input.type === "radio") {
                if (input.checked) {
                    values[input.name] = input.value;
                }
            } else if (input.type === "checkbox") {
                values[input.name] = input.checked;
            } else if (input.type === "number") {
                values[input.name] = Number(input.value);
            } else {
                values[input.name] = input.value;
            }
        });

        return values;
    }

    let lastValues = extractAllValues();

    if (typeof onChangeCallback === "function") {
        onChangeCallback(lastValues);
    }

    if (typeof onChangeCallback === "function") {
        container.addEventListener("change", event => {
            if (event.target.matches("input, select, textarea")) {
                const newValues = extractAllValues();

                const changed =
                    JSON.stringify(newValues) !== JSON.stringify(lastValues);
                if (changed) {
                    lastValues = newValues;
                    onChangeCallback(newValues);
                }
            }
        });
    }

    return lastValues;
}

// Update functions

function updateRaceimg(selected) {
    const container = document.getElementById("Race-img");
    if (!container) return;

    // Try to find an existing img
    let raceImg = container.querySelector("img");

    // If it doesn't exist, create it once
    if (!raceImg) {
        raceImg = document.createElement("img");
        container.appendChild(raceImg);
    }

    // Only update src if it's actually different
    const newSrc = `../assets/images/Race-icons/rcIco_${selected}.png`;
    if (raceImg.src !== new URL(newSrc, location.href).href) {
        raceImg.src = newSrc;
        raceImg.id = selected;
        raceImg.alt = `${selected}.png`;
    }
}

function updateProfile(values) {
    const { nickname, race, skillclass, level } = values;

    // Get the spans inside #player-profile
    const nickSpan = document.getElementById("profile-nick");
    const raceSpan = document.getElementById("profile-race");
    const classSpan = document.getElementById("profile-class");
    const levelSpan = document.getElementById("profile-level");

    if (nickSpan) nickSpan.textContent = nickname || "--";

    if (raceSpan) {
        raceSpan.textContent = race
            ? race.toLowerCase() === "azora"
                ? "Kubold"
                : race.charAt(0).toUpperCase() + race.slice(1)
            : "None selected";
    }

    if (classSpan) classSpan.textContent = skillclass || "None selected";
    if (levelSpan) levelSpan.textContent = level || -99;
}


function updateClassDisplay(selectedClass) {
    document.querySelectorAll(".icon-container").forEach(box =>
        box.classList.add("hidden")
    );

    if (selectedClass) {
        const resultClass = document.getElementById(selectedClass);
        if (resultClass) {
            resultClass.classList.remove("hidden");
        }
    }
}


