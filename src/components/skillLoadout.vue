<script setup>
import { ref, reactive, watch } from 'vue';

import skillClass from '../assets/skills-data/index.json';

const defaultClass = ref('Novice');
const race = ref('poon');
const level = reactive({
  min: 1,
  max: 32,
  value: 32,
});

// Watch for changes and clamp value between min and max
watch(
  () => level.value,
  (newVal) => {
    if (newVal > level.max) level.value = level.max;
    if (newVal < level.min) level.value = level.min;
  }
);
// Collect mastery skills from Fighter, Mystic, Bandit
const masterySkills = [
  ...(skillClass.Fighter.Mastery || []).map((s) => ({
    skill: s,
    origin: 'Fighter',
  })),
  ...(skillClass.Mystic.Mastery || []).map((s) => ({
    skill: s,
    origin: 'Mystic',
  })),
  ...(skillClass.Bandit.Mastery || []).map((s) => ({
    skill: s,
    origin: 'Bandit',
  })),
];

// Build class containers but exclude "Mastery" from others
const skillSets = Object.entries(skillClass).map(([name, categories]) => {
  const filteredCategories = Object.fromEntries(
    Object.entries(categories).filter(([cat]) => cat !== 'Mastery')
  );
  return { name, categories: filteredCategories };
});

// Inject Mastery into Novice with a special label
const novice = skillSets.find((s) => s.name === 'Novice');
if (novice) {
  novice.categories['Universal Masteries'] = masterySkills;
}
</script>

<template>
  <div>Class selected: {{ defaultClass }}</div>

  <div v-for="set in skillSets" :key="set.name">
    <input
      type="radio"
      :id="set.name"
      :value="set.name"
      v-model="defaultClass"
    />
    <label :for="set.name"
      ><img
        :src="`./images/misc/${set.name}_(Icon).png`"
        :alt="`${set.name}_(Icon).png`"
      />{{ `${set.name}` }}</label
    >
  </div>

  <div>
    <div>Level selected: {{ level.value }}</div>

    <label for="level">Level ({{ level.min }}-{{ level.max }}) </label>
    <input
      id="level"
      type="number"
      v-model.number="level.value"
      :min="level.min"
      :max="level.max"
    />
  </div>
  <div>
    <div>Picked: {{ race }}</div>

    <div>
      <img
        :src="`./images/Race-icons/rcIco_${race}.png`"
        :alt="`rcIco_${race}.png`"
      />
    </div>

    <div>
      <span>Race: </span>
      <input type="radio" id="poon" value="poon" v-model="race" />
      <label for="poon">Poon</label>

      <input type="radio" id="kubold" value="azora" v-model="race" />
      <label for="kubold">Kubold</label>

      <input type="radio" id="byrdle" value="byrdle" v-model="race" />
      <label for="byrdle">Byrdle</label>

      <input type="radio" id="chang" value="chang" v-model="race" />
      <label for="chang">Chang</label>

      <input type="radio" id="imp" value="imp" v-model="race" />
      <label for="imp">Imp</label>
    </div>
  </div>

  <div v-for="set in skillSets" :key="set.name" class="class-container">
    <h2>{{ `${set.name} Skills` }}</h2>

    <!-- Loop through categories (Action, Support, etc.) -->
    <div v-for="(skills, category) in set.categories" :key="category">
      <h3>{{ category }}</h3>
      <div class="icon-container">
        <img
          v-for="item in skills"
          :key="item.skill || item"
          :src="`./images/${item.origin || set.name}-icons/${item.skill || item}.png`"
          :alt="`${item.skill || item}.png`"
          class="icon"
          :title="(item.skill || item).replace('_', ' ')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
  cursor: pointer;
  image-rendering: pixelated;
  border-radius: 5px;
  height: 60px;
  width: 60px;
}

.icon-container .icon:hover {
  transform: scale(1.1);
}

.skillbar-container {
  width: fit-content;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.skillbar {
  display: flex;
  gap: 10px;
  background-color: #f1f1f1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.skillbar-slot {
  width: 60px;
  height: 60px;
  border: 2px dashed #aaa;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: hidden;
}
</style>
