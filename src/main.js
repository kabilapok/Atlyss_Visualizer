// Predefined list of categories and their images
const categories = {
    "Novice-icons": ['Recovery.png', 'Rock_Toss.png', 'Divine.png'],

    "Fighter-icons": ['Rage.png', 'Lethal_Strike.png'],
    "Mystic-icons": ['Restora.png', 'Cross.png'],
    "Bandit-icons": ['Volley.png', 'Pay_Day.png']
};

// Containers for each category
const containers = {
    "Novice-icons": document.getElementById('novice-box'),

    "Fighter-icons": document.getElementById('Fighter-box'),
    "Mystic-icons": document.getElementById('Mystic-box'),
    "Bandit-icons": document.getElementById('Bandit-box')
};


// Function to append all images for a category
function appendCategoryImages(category) {
    const parentContainer = containers[category];

    if (!parentContainer) {
        console.error(`Container for category "${category}" not found.`);
        return;
    };

    const images = categories[category];
    if (!images) {
        console.error(`No images found for category "${category}".`);
        return;
    };

    images.forEach((icon) => {
        const img = document.createElement('img');
        img.src = `../assets/${category}/${icon}`;
        img.alt = icon;
        img.className = 'icon';
        img.draggable = true;
        parentContainer.appendChild(img);
    });

};


appendCategoryImages("Novice-icons");


appendCategoryImages("Fighter-icons");
appendCategoryImages("Mystic-icons");
appendCategoryImages("Bandit-icons");



const choices = document.querySelectorAll('.class-choice img');

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const resultBox = document.querySelectorAll('.skill-class');
        resultBox.forEach(box => box.style.display = 'none');

        const choiceId = choice.getAttribute('data-choice');
        const resultClass = document.getElementById(`${choiceId}-box`);
        if (resultClass) {
            resultClass.style.display = 'flex';
            resultClass.style.justifyContent = 'center';
        };

    });

    
});



// Stats Section






// Stats Calculation
/*
function modif() {
    let lvl = 1;
    return  () => {
        lvl += 1;
        return lvl;
    }
};
*/

/*
const add = modif();
function lvlModifier() {
    document.getElementById("level").innerHTML = add();
}
*/

const stats = {
    lvl: 1,
    health: 19,
    mana: 15
}

document.getElementById("level").innerHTML = stats.lvl;

document.getElementById("health").innerHTML = stats.health;
document.getElementById("mana").innerHTML = stats.mana;


// Function using the lvl to change other modifiers
// When lvl is changed, modifiers are also changed

const modifs = document.querySelectorAll('.modif');
modifs.forEach(() => {
    modifs.forEach(box => box.innerHTML = "LOL");
});




/*
const dropdown = document.getElementById('numberDropdown');

// Generate options dynamically
for (let i = 1; i <= 25; i++) {
    const option = document.createElement('option');
    option.value = i;        // Set the value
    option.textContent = i;  // Set the visible text
    dropdown.appendChild(option);
}

const placeholder = document.createElement('option');
placeholder.textContent = 'Select a number';
placeholder.value = '';
placeholder.disabled = true;
placeholder.selected = true;
dropdown.appendChild(placeholder);
*/



//DRAG AND DROP  Section
