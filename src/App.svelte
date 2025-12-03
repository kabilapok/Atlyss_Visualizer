<script>
  import { onMount } from 'svelte';
  import { skillStore } from './lib/stores/skillStore.js';

  import Header from './components/Header.svelte';
  import Stats from './components/StatLoadout.svelte';
  import Profile from './components/ProfileLoadout.svelte';
  import SkillLoadout from './components/SkillLoadout.svelte';
  import Skillbar from './components/Skillbar.svelte';
  // import Equipment from './components/Equipment.svelte';

  onMount(() => {
    skillStore.load();
  });
</script>

<main>
  <!-- <Equipment /> -->
  <Header />
  <Stats />
  <Profile />
  <SkillLoadout />
  <Skillbar />
</main>

<style>

</style>
