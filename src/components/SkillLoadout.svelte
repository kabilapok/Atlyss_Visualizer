<script>
  // import {tippy} from 'svelte-tippy';
  // import 'tippy.js/dist/tippy.css';
  import { onMount } from 'svelte';
  import { loadAllIcons } from '../utils/iconLoader.js';

  let icons = [];
  let loading = true;

  onMount(async () => {
    icons = await loadAllIcons(); 
    loading = false;
  });
</script>

{#if loading}
  <p><strong>Loading icons...</strong></p>
{:else}
  <div class="icon-container">
    {#each icons as icon}
      <img 
        src={icon.url} 
        alt={icon.name}.png
        title={icon.loaded ? icon.name.replace(/_/g, ' ') : `${icon.name}.png`}
        class:failed={!icon.loaded} 
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
