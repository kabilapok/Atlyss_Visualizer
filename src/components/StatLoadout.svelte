<script>
  import { checkStats } from '../utils/statLoader.js';
  import { defaultLevelValue, DEFAULT_LEVEL } from '../lib/stores/level.js'
    
  $: stats = checkStats($defaultLevelValue);
   
  function formatStatName(key) {
    switch (key) {
      case "hp":
      return "Max Health";

      case "mp":
      return "Max Mana";

      case "stam":
      return "Max Stamina";

      case "attackPoints":
      return "Attack Power";

      case "mgkPowerPoints":
      return "Mgk. Power";

      case "dexPowerPoints":
      return "Dex Power";

      default:
      return key.charAt(0).toUpperCase() + key.slice(1);
    }
  }

</script>

<div>
{#each Object.entries(stats) as [stat, value]}
  <div>
  <span><strong>{formatStatName(stat)}:</strong>  </span>
  <span>{value}</span>
  <button>+</button>
  </div>
{/each}
</div>

<style>
</style>
