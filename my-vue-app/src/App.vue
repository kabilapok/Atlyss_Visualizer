<template>
  <main>
    <header>
      <h1>Visualizer</h1>
      <button id="theme-toggle" aria-label="Toggle dark mode">
        <img
          id="theme-icon"
          :src="currentIcon"
          @click="togglerIcon"
          alt="Toggle theme"
          width="32"
          height="32"
        />
      </button>
    </header>

    <!-- <test /> -->

    <skillLoadout />
  </main>
</template>

<script setup>
import skillLoadout from './components/skillLoadout.vue';
//import test from './components/testFile.vue';

import { ref } from 'vue';
let currentIcon = ref('../images/misc/_ico_night.png');

function togglerIcon() {
  currentIcon.value =
    currentIcon.value === '../images/misc/_ico_night.png'
      ? '../images/misc/_ico_day.png'
      : '../images/misc/_ico_night.png';
}
</script>

<style scoped>
#theme-toggle {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
