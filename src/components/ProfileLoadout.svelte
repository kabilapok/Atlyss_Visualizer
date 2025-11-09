<script>
  import { profileFormat } from '../utils/profileFormat.js';
  const { defaultState: baseState, profileData } = profileFormat();
  function clampLevel() {
    const lvl = defaultState.level.value;
    const min = defaultState.level.min;
    const max = defaultState.level.max;
    defaultState.level.value = Math.min(max, Math.max(min, lvl));
  }
</script>

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
  <div>Level selected: {defaultState.level.value}</div>
  <label for="level">
    Level
  </label>
  <input type="number" class="number-input" id="level" onInput={clampLevel} bind:value={defaultState.level.value} min={defaultState.level.min} max={defaultState.level.max}>
  <input type="range" list="tickmarks" step="1" class="number-input" id="level" onInput={clampLevel} bind:value={defaultState.level.value} min={defaultState.level.min} max={defaultState.level.max}>
    <datalist id="tickmarks">
      <option value={defaultState.level.min}></option>
      <option value={defaultState.level.max / 2}></option>
      <option value={defaultState.level.max}></option>
    </datalist>
</div>

<!-- Class Selection -->
<div>
  <div>Class selected: {defaultState.class}</div>
  {#each profileData.classes as classes}
  <label>
    <input type="radio" id={classes.name} value={classes.name} bind:group={defaultState.class}><img src={classes.icon} alt={classes.name}.png/>{classes.name}
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
</style>
