document.querySelectorAll('.box').forEach(box => {
    Sortable.create(box, {
        group: {
            name: 'shared',
            put: false
        },

        sort: false

    })
});

['hotbar-1', 'hotbar-2'].forEach(hotbarId => {
    Sortable.create(document.getElementById(hotbarId), {
        animation: 150,
        swap: true,
        swapClass: 'swap-preview',  // this will toggle the CSS class
        onAdd(evt) {
            const fromSlot = evt.from;

            const toSlot = evt.to;
            const draggedItem = evt.item;

            if (toSlot.children.length > 1) {
                const existingItem = toSlot.children[0];
                toSlot.removeChild(draggedItem);
                fromSlot.appendChild(existingItem);

                evt.appendChild(existingItem);
            }

            toSlot.appendChild(draggedItem);
        }
    });
});




document.querySelectorAll('.hotbar-slot').forEach(slot => {
    Sortable.create(slot, {
        group: 'shared',
        draggable: true,
        onAdd(evt) {
            const fromSlot = evt.from;
            const toSlot = evt.to;
            const draggedItem = evt.item;

            // If destination already has an item, swap them
            if (toSlot.children.length > 1) {
                const existingItem = toSlot.children[0];

                // Remove the dragged item from the destination
                toSlot.removeChild(draggedItem);

                // Put the existing item back into the origin slot
                fromSlot.appendChild(existingItem);
            }

            // Append the dragged item into the destination slot
            toSlot.appendChild(draggedItem);
        }

    });
});



// click to remove (and bring back) individual abilities
document.getElementById('hotbar').addEventListener('click', (event) => {
    const slot = event.target.closest('.hotbar-slot');
    if (!slot) return;

    const img = slot.querySelector('img');
    
    if (slot && document.getElementById('hotbar').contains(slot) && slot.contains(img)) {
        console.log('hotbar-slot clicked!');

        const originalContainerId = img.dataset.originalContainer;
        const originalContainer = document.getElementById(originalContainerId);
        

        if (originalContainer) {
            img.setAttribute('draggable', true);
            originalContainer.appendChild(img);
        } else {
            img.remove(); // Or just remove it if no original container
        }
    };
});