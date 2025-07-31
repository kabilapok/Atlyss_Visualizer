const iconBox = document.querySelectorAll(".dragdropJSdragbox");
const hotbarSlot = document.querySelectorAll(".hotbar-slot");
const hotbarContainers = document.querySelectorAll(".hotbar-box");

iconBox.forEach(box => {
    Sortable.create(box, {
        group: {
            name: "skills",
            put: false
        },

        sort: false
    })
});

hotbarSlot.forEach(slot => {
    Sortable.create(slot, {
        group: {
            name: "skills",
        },

        draggable: true,

        onAdd(evt) {
            const toSlot = evt.to;
            const draggedItem = evt.item;
            const img = slot.querySelector('img');

            const originalContainerId = img.dataset.originalContainer;
            const originalContainer = document.getElementById(originalContainerId);


            // If destination already has an item, swap them
            if (toSlot.children.length > 1) {

                // Put the existing item back into the origin slot
                originalContainer.appendChild(img);
            }

            // Append the dragged item into the destination slot
            toSlot.appendChild(draggedItem);
        }
    })
})

hotbarContainers.forEach(container => {
    Sortable.create(container, {
        group: {
            name: "hotbars"
        },
        animation: 150,
        swap: true,
        swapClass: 'swap-preview',
    });
})

// click to remove (and bring back) individual skill icons from the hotbar
document.getElementById('hotbar').addEventListener('click', (event) => {
    const slot = event.target.closest('.hotbar-slot');
    if (!slot) return;

    const img = slot.querySelector('img');

    if (slot && document.getElementById('hotbar').contains(slot) && slot.contains(img)) {
        console.log('hotbar-slot clicked!');

        const originalContainerId = img.dataset.originalContainer;
        const originalContainer = document.getElementById(originalContainerId);

        if (originalContainer) {
            originalContainer.appendChild(img);
        } else {
            img.remove(); // Or just remove it if no original container
        }
    };
});