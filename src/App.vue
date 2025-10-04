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

let currentIcon = ref('./images/misc/ico_night.png');

function togglerIcon() {
  currentIcon.value =
    currentIcon.value === '.public/images/misc/ico_night.png'
      ? 'public/images/misc/ico_day.png'
      : 'public/images/misc/ico_night.png';
}
</script>

<style scoped></style>
