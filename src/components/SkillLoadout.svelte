<script>
  import Muuri from 'muuri';
  import tippy from 'tippy.js';
  import '../styles/tooltip.css';
  import 'tippy.js/dist/tippy.css';
  import { onMount } from 'svelte';
  import { loadAllIcons } from '../utils/iconLoader.js';
  import { loadData, createTooltipContent } from '../utils/tooltip.js';

  let icons = [];
  let loading = true;

  let classes = {};

  onMount(async () => {
    icons = await loadAllIcons(); 
    classes = await loadData();
    loading = false;
  });

  function tooltip(el, [className, skillName]) {
    let skill;

    for (const classObj of Object.values(classes)) {
      if (classObj.skills?.[skillName]) {
        skill = classObj.skills[skillName];
        break;
      }
    }

    tippy(el, {
      allowHTML: true,
      content: skill ?  createTooltipContent(skill) : "<em>No data available>",
      placement: "top",
      delay: [150, 0]
    });
  }
  
</script>

{#if loading}
  <p><strong>Loading icons...</strong></p>
{:else}
  <div class="icon-container">
    {#each icons as icon}
      <div class="icon-item"
      use:tooltip={["", icon.name]}
      >
        <div class="icon-bottom"></div>
        <img 
          src={icon.url} 
          alt={icon.name}.png
          class:failed={!icon.loaded}
          draggable="false"
        />
        <div class="icon-top"></div>
      </div>
    {/each}
  </div>
{/if}


<style>
	
 .icon-container {
    display: flex;
    position: relative;
    gap: 10px;
    flex-wrap: wrap;
    
  }
  
 .icon-container img {
    position: relative;
    width: 60px;
    height: 60px;
    z-index: 2;
    pointer-events: none;
  }
  
  .icon-item {
    position: relative;
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
    overflow: hidden;
  }
  
  .icon-bottom {
    position: absolute;
    background: url('/images/misc/bk_02.png') center/72px 72px no-repeat;
    image-rendering: pixelated;
    inset: 0;
    z-index: 1;
  }

  .icon-top {
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
