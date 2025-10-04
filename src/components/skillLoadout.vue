<script setup>
import skillClass from '../assets/skills-data/index.json';

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
  <div>
    <div class="skillbar-container">
      <div class="skillbar">
        <div class="skillbar-slot"></div>
        <div class="skillbar-slot"></div>
        <div class="skillbar-slot"></div>
        <div class="skillbar-slot"></div>
        <div class="skillbar-slot"></div>
        <div class="skillbar-slot"></div>
      </div>
      <div class="skillbar">
        <div class="skillbar-slot"></div>
        <div class="skillbar-slot"></div>
        <div class="skillbar-slot"></div>
        <div class="skillbar-slot"></div>
        <div class="skillbar-slot"></div>
        <div class="skillbar-slot"></div>
      </div>
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
          draggable="true"
          :originalContainer="category"
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
