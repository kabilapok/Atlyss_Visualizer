<template>
  <main>
    <header>
      <h1>Visualizer</h1>
      <button
        id="theme-toggle"
        aria-label="Toggle dark mode"
        @click="handleClick"
      >
        <div class="icon-container">
          <!-- Theme icon -->
          <img id="theme-icon" :src="currentIcon" alt="Toggle theme" />

          <!-- Spinning icon -->
          <img
            id="spinIco"
            :src="pendulumIcon"
            alt=""
            :class="{ spinning: isSpinning }"
        />
        </div>
      </button>
    </header>

    <profileInput />

    <skillLoadout />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import skillLoadout from './components/skillLoadout.vue';

import profileInput from './components/profileInput.vue';

// Icons
const lightIcon = './images/misc/_ico_day.png';
const darkIcon = './images/misc/_ico_night.png';
const pendulumIcon = './images/misc/_ico_dayNightPendulum.png';

const currentIcon = ref(darkIcon);
const isSpinning = ref(false);

onMounted(() => {
  const isDark = document.documentElement.classList.contains('dark');
  currentIcon.value = isDark ? darkIcon : lightIcon;
});

// Toggle theme
function togglerIcon() {
  const root = document.documentElement;
  const isDark = root.classList.toggle('dark');

  currentIcon.value = isDark ? darkIcon : lightIcon;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Click handler for button: toggle theme + spin
function handleClick() {
  togglerIcon();

  isSpinning.value = true;
  setTimeout(() => (isSpinning.value = false), 600); // duration
}
</script>

<style scoped>
#theme-toggle {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  user-select: none;
}

.icon-container {
  position: relative;
  width: 64px;
  height: 64px;
}

#theme-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 32px;
  height: 32px;
  image-rendering: pixelated;
}

#spinIco {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  z-index: 0;
  image-rendering: pixelated;
}

/* Rotation animation */
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.spinning {
  animation: spin 0.6s ease-in-out;
}
</style>
