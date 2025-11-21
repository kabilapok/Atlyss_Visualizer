<script>
  import Muuri from 'muuri';
  import tippy from 'tippy.js';
  import '../styles/tooltip.css';
  import 'tippy.js/dist/tippy.css';

  import { onMount, tick } from 'svelte';
  import { loadAllIcons } from '../utils/iconLoader.js';
  import { loadData, createTooltipContent } from '../utils/tooltip.js';
  import { defaultClassValue, DEFAULT_CLASS } from '../lib/stores/level.js';  

  let icons = [];
  let loading = true;
  let classes = {};
  let grid;

  onMount(async () => {
    icons = await loadAllIcons();
    classes = await loadData();
    loading = false;

    await tick(); // ensure DOM is ready

    grid = new Muuri('.grid', {
      dragEnabled: true,
      layout: {
        fillGaps: true,
      }
    });

    // Listen to store changes → trigger filtering
    defaultClassValue.subscribe(filterByClass);
  });

  function filterByClass(selected) {
    if (!grid) return;

    grid.filter(item => {
      const el = item.getElement();
      const category = el.dataset.category;
      const name = el.dataset.name;

      const isMastery = name.includes("Mastery");

      return (
        category === DEFAULT_CLASS ||
        category === selected ||
        isMastery
      );
    });
  }

  function tooltip(el, [_, skillName]) {
    let skill;

    for (const classObj of Object.values(classes)) {
      if (classObj.skills?.[skillName]) {
        skill = classObj.skills[skillName];
        break;
      }
    }

    tippy(el, {
      allowHTML: true,
      content: skill
        ? createTooltipContent(skill)
        : "<em>No data available</em>",
      placement: "top",
      delay: [150, 0]
    });
  }
</script>

{#if loading}
  <p><strong>Loading icons...</strong></p>
{:else}
  <div class="grid">
    {#each icons as icon}
      <div
        class="item"
        data-category={icon.category}
        data-name={icon.name}
        use:tooltip={["", icon.name]}
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
{/if}

<style>
  /* Muuri container */
  .grid {
    position: relative;
  }

  /* Muuri item */
  .item {
    position: absolute;
    width: 72px;
    height: 72px;
    cursor: grab;
  }

  /* Required Muuri wrapper */
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
