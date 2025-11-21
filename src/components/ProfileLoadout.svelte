<script>
  import { defaultLevelValue, DEFAULT_LEVEL, defaultClassValue, DEFAULT_CLASS } from '../lib/stores/level.js'  
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';
  import { profileFormat } from '../utils/profileFormat.js';
  import { saveSlot, loadSlot } from '../lib/storage/profileStorage.js';
  
  const { defaultState: baseState, profileData } = profileFormat();
  let defaultState = structuredClone(baseState);

  const SLOT_COUNT = 7;
  let activeSlot = 0;

  onMount(() => {
  applyLoadedProfile(loadSlot("profile", activeSlot, baseState));
  });

  function saveCurrentSlot() {
  const dataToSave = {
    ...defaultState,
    level: {
      ...defaultState.level,
      value: get(defaultLevelValue) // take store value at saving time
    }
  };

  saveSlot("profile", activeSlot, dataToSave);
}


function loadSlotIndex(index) {
activeSlot = index;
  applyLoadedProfile(loadSlot("profile", activeSlot, baseState));
}

function applyLoadedProfile(loaded) {
  defaultState = structuredClone(loaded);

  if (loaded.level?.value != null) {
    defaultLevelValue.set(loaded.level.value);
  }

}
  function resetProfile() {
    defaultState = structuredClone(baseState);
    defaultLevelValue.set(DEFAULT_LEVEL);
    saveCurrentSlot();
  } 
  

  function clampLevel() {
    const lvl = $defaultLevelValue;
    const min = defaultState.level.min;
    const max = defaultState.level.max;
    $defaultLevelValue = Math.min(max, Math.max(min, lvl));
  }
</script>

<div class="slots">
  {#each Array(SLOT_COUNT) as _, i}
    <button
      class:active={i === activeSlot}
      onclick={() => loadSlotIndex(i)}
    >
      Slot {i + 1}
    </button>
  {/each}
</div>

<div class="buttons">
  <button onclick={saveCurrentSlot}>Save Slot</button>
  <button onclick={resetProfile}>Reset to Default</button>
</div
>
<div id="profile-box"><h2>Profile Box</h2></div>

<!-- Nickname -->
<div>
  {#if defaultState.nick === ''}
    <p>Empty input</p>
  {:else}
    <div>Your input: { defaultState.nick }</div>
  {/if}
    <input class="text-input" type="text" bind:value={defaultState.nick} placeholder="IHaveALoonaPlush">
</div>

<!-- Race Selection -->
<div>
  <div>Race Picked: {defaultState.race}</div>
  <img src={profileData.races.find((r) => r.id === defaultState.race).icon} alt={defaultState.race}.png>
  {#each profileData.races as races (races.id) }
  <label>
    <input type="radio" id={races.id} value={races.id} bind:group={defaultState.race}>{races.label}
  </label>
  {/each}
</div>

<!-- Level Selection -->
<div>
  <div>Level selected: {$defaultLevelValue}</div>
  <label for="level">
    Level
  </label>
  <input type="number" class="number-input" id="level" oninput={clampLevel} bind:value={$defaultLevelValue} min={defaultState.level.min} max={defaultState.level.max}>

  <input type="range" step="1" class="number-input" id="level" oninput={clampLevel} bind:value={$defaultLevelValue} min={defaultState.level.min} max={defaultState.level.max}>
</div>

<!-- Class Selection -->
<div>
  <div>Class selected: {$defaultClassValue}</div>
  {#each profileData.classes as classes}
  <label>
    <input type="radio" id={classes.name} value={classes.name} bind:group={$defaultClassValue}><img src={classes.icon} alt={classes.name}.png/>{classes.name}
  </label>
  {/each}
</div>

<style>

  div:has(div) {
    border: solid 1px white;
    padding: 3px;
    margin: 5px;
    width: max-content;
  }

  .number-input {
    color: inherit;
    font-weight: bold;
    font-family: inherit;
    font-size: xx-large;
    background: transparent;
  }

  .text-input {
    background: transparent;      
    border: 2px solid #888;
    border-radius: 6px;
    padding: 6px 10px;
    color: inherit;               
    outline: none;    
  }

  .text-input:focus {
    border-color: #ffb400;        
  }

  /* Optional hover */
  .text-input:hover {
    border-color: #c9c9c9;
  }

  .slots button.active {
    border: 2px solid #ffd256;
    background: #2f2f2f;
  }
 
  .buttons button {
    margin-right: 8px;
  }
  
</style>
