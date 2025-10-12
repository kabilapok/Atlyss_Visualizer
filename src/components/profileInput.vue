<script setup>
import { useProfile } from '../composables/useProfile';

// Dynamic data arrays
const classes = [
  { name: 'Fighter', icon: './images/misc/Fighter_(Icon).png' },
  { name: 'Mystic', icon: './images/misc/Mystic_(Icon).png' },
  { name: 'Bandit', icon: './images/misc/Bandit_(Icon).png' },
  { name: 'Novice', icon: './images/misc/Novice_(Icon).png' },
];

const races = [
  { id: 'poon', label: 'Poon', icon: './images/Race-icons/rcIco_poon.png' },
  { id: 'azora', label: 'Kubold', icon: './images/Race-icons/rcIco_azora.png' },
  {
    id: 'byrdle',
    label: 'Byrdle',
    icon: './images/Race-icons/rcIco_byrdle.png',
  },
  { id: 'chang', label: 'Chang', icon: './images/Race-icons/rcIco_chang.png' },
  { id: 'imp', label: 'Imp', icon: './images/Race-icons/rcIco_imp.png' },
];

// Single reactive state
const state = useProfile();
</script>

<template>
  <!-- Nickname -->
  <div>
    <div>Your input: {{ state.nick }}</div>
    <input type="text" v-model="state.nick" placeholder="IHaveALoonaPlush" />
  </div>

  <!-- Race Selection -->
  <div>
    <div>Picked: {{ state.race }}</div>
    <img :src="races.find((r) => r.id === state.race).icon" :alt="state.race" />
    <div>
      <span>Race: </span>
      <template v-for="r in races" :key="r.id">
        <input type="radio" :id="r.id" :value="r.id" v-model="state.race" />
        <label :for="r.id">{{ r.label }}</label>
      </template>
    </div>
  </div>

  <!-- Level Selection -->
  <div>
    <div>Level selected: {{ state.level.value }}</div>
    <label for="level"
      >Level ({{ state.level.min }}-{{ state.level.max }})</label
    >
    <input
      id="level"
      type="number"
      v-model.number="state.level.value"
      :min="state.level.min"
      :max="state.level.max"
      @input="
        state.level.value = Math.min(
          state.level.max,
          Math.max(state.level.min, state.level.value)
        )
      "
    />
  </div>

  <!-- Class Selection -->
  <div>
    <div>Class selected: {{ state.class }}</div>
    <div class="class-profile" v-for="cls in classes" :key="cls.name">
      <input
        type="radio"
        :id="cls.name"
        :value="cls.name"
        v-model="state.class"
      />
      <label :for="cls.name">
        <img :src="cls.icon" :alt="cls.name + ' Icon.png'" /> {{ cls.name }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.class-profile {
  display: inline-block;
  margin-right: 0.8rem;
}
</style>
