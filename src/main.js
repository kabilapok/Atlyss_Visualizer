// Predefined list of categories and their images
const categories = {
    "Novice-icons": ['Recovery.png', 'Rock_Toss.png'],

    "Fighter-icons": ['Rage.png', 'Lethal_Strike.png'],
    "Mystic-icons": ['Restora.png', 'Cross.png'],
    "Bandit-icons": ['Volley.png', 'Pay_Day.png']
};

// Containers for each category
const containers = {
    "Novice-icons": document.getElementById('novice-box'),

    "Fighter-icons": document.getElementById('fighter-box'),
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


