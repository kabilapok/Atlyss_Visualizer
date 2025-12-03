<script>
  import tippy from 'tippy.js';
  import '../styles/tooltip.css';
  import 'tippy.js/dist/tippy.css';

  import { skillStore } from '../lib/stores/skillStore.js';
  import { defaultClassValue, DEFAULT_CLASS } from '../lib/stores/level.js';
  import { createTooltipContent } from '../utils/tooltip.js';

  let selectedClass = $defaultClassValue;
  let dragOverCategory = null;

  // Define the desired order for the category grids
  const categoryOrder = ['Mastery', 'Novice', 'Fighter', 'Mystic', 'Bandit'];
  let sortedIconCategories = [];

  // Reactively sort the categories whenever the store changes
  $: {
    if ($skillStore.isLoaded) {
      sortedIconCategories = Object.entries($skillStore.loadout).sort(([catA], [catB]) => {
        const indexA = categoryOrder.indexOf(catA);
        const indexB = categoryOrder.indexOf(catB);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
    }
  }

  defaultClassValue.subscribe((newClass) => {
    selectedClass = newClass;
  });

  function handleDragStart(event, icon, groupCategory) {
    const payload = {
      source: 'loadout',
      name: icon.name,
      category: groupCategory, // Use the correct group category for lookup
    };
    event.dataTransfer.setData('text/plain', JSON.stringify(payload));
    event.dataTransfer.effectAllowed = 'move';
  }

  function handleDrop(event) {
    event.preventDefault();
    const payload = JSON.parse(event.dataTransfer.getData('text/plain'));
    if (!payload) return;

    // Use the unified function to move an item back to the loadout
    skillStore.moveToLoadout(payload);
    dragOverCategory = null;
  }

  function isGridVisible(category, currentClass) {
    return category === DEFAULT_CLASS || category === 'Mastery' || category === currentClass;
  }

  function tooltip(el, skill) {
    if (!skill) return;
    tippy(el, {
      allowHTML: true,
      content: createTooltipContent(skill),
      placement: 'top',
      delay: [150, 0]
    });
  }
</script>

{#if !$skillStore.isLoaded}
  <p><strong>Loading icons...</strong></p>
{:else}
  {#each sortedIconCategories as [category, categoryIcons] (category)}
    <div
      class="class-container"
      class:visible={isGridVisible(category, selectedClass)}
      class:drag-over={dragOverCategory === category}
      on:dragenter|preventDefault={() => dragOverCategory = category}
      on:dragleave|preventDefault={() => dragOverCategory = null}
      on:dragover|preventDefault={(e) => { e.dataTransfer.dropEffect = 'move'; }}
      on:drop={handleDrop}
    >
      <h3>{category} Icons</h3>
      <div class="grid grid-{category}">
        {#each categoryIcons as icon (icon.name)}
          <div
            class="item"
            data-category={icon.category}
            data-name={icon.name}
            use:tooltip={icon}
            draggable="true"
            on:dragstart={(event) => handleDragStart(event, icon, category)}
          >
            <div class="item-content">
              <div class="bg-bottom"></div>
              <img
                src={icon.url}
                alt={icon.name}
                data-name={icon.name}
                draggable="false"
                class:failed={!icon.loaded}
                class="skill-icon"
              />
              <div class="bg-top"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
{/if}

<style>
  .class-container {
    display: none; /* Hidden by default */
    padding: 1rem;
    border: 2px dashed transparent;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }
  .class-container.visible {
    display: block; /* Made visible by class */
  }
  .class-container.drag-over {
    border-color: #555;
    background-color: #2a2a2a;
  }
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    min-height: 80px; /* Ensure drop zone is available even if empty */
  }
  .item {
    width: 72px;
    height: 72px;
    cursor: grab;
    position: relative;
  }
  .item-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .skill-icon {
    width: 60px;
    height: 60px;
    pointer-events: none;
    image-rendering: pixelated;
    z-index: 2;
  }
  .bg-bottom {
    position: absolute;
    inset: 0;
    background: url('/images/misc/bk_02.png') center/72px 72px no-repeat;
    image-rendering: pixelated;
    z-index: 1;
  }
  .bg-top {
    position: absolute;
    inset: 0;
    background: url('/images/misc/bkOver_01.png') center/68px 68px no-repeat;
    image-rendering: pixelated;
    z-index: 3;
  }
  .failed {
    opacity: 0.5;
    filter: grayscale(80%);
  }
</style>
