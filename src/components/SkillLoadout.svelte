<script>
  import '../styles/tooltip.css';
  import {tippy} from 'svelte-tippy';
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
      content: skill ?  createTooltipContent(skill) : "<em> No data available>",
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
      <img 
        src={icon.url} 
        alt={icon.name}.png
        class:failed={!icon.loaded}
        use:tooltip={["", icon.name]}
      />
    {/each}
  </div>
{/if}


<style>
	
 .icon-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
 .icon-container img {
    width: 64px;
    height: 64px;
    image-rendering: pixelated;
  }

 .failed {
    opacity: 0.5;
    filter: grayscale(80%);
  }
  

</style>
