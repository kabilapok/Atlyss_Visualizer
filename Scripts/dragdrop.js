const iconBoxes = document.querySelectorAll(".dragdropJSdragbox");
const skillbarSlots = document.querySelectorAll(".skillbar-slot");
const skillbarContainers = document.querySelectorAll(".skillbar");
const skillbarContainer = document.querySelector(".skillbar-container");

// Initialize Sortable for skill icon pools (drag source only)
iconBoxes.forEach(box => {
    Sortable.create(box, {
        group: { name: "skills", put: false },
        sort: false
    });
});

// Initialize Sortable for each skillbar slot
skillbarSlots.forEach(slot => {
    Sortable.create(slot, {
        group: { name: "skills" },
        draggable: true,

        onAdd(evt) {
            const toSlot = evt.to;
            const draggedItem = evt.item;
            const existingImg = slot.querySelector("img");

            // Return existing item if slot already occupied
            if (existingImg) {
                const originalContainerId = existingImg.dataset.originalContainer;
                const originalContainer = document.getElementById(originalContainerId);
                if (originalContainer) originalContainer.appendChild(existingImg);
            }

            // Place dragged item into slot
            toSlot.appendChild(draggedItem);
        }
    });
});

// Initialize Sortable for the skillbar container (for reordering/swapping)
skillbarContainers.forEach(container => {
    Sortable.create(container, {
        group: { name: "hotbars" },
        animation: 150,
        swap: true,
        swapClass: "swap-preview"
    });
});

// Click-to-remove skill from hotbar
if (skillbarContainer) {
    skillbarContainer.addEventListener("click", event => {
        const slot = event.target.closest(".skillbar-slot");
        if (!slot) return;

        const img = slot.querySelector("img");
        if (!img) return;

        console.log("skillbar-slot clicked!");

        const originalContainerId = img.dataset.originalContainer;
        const originalContainer = document.getElementById(originalContainerId);

        if (originalContainer) {
            originalContainer.appendChild(img);
        } else {
            img.remove(); // fallback
        }
    });
}
