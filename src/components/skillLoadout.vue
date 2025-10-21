<script setup>
import { ref, computed } from 'vue';
import skillClass from '../assets/skills-data/index.json';
import { useTooltip } from '../composables/useTooltip.js';
import SkillIcon from './skillIcon.vue';
import '../assets/style/tooltip.css';
import hoverSoundFile from '../assets/audio/_uiHover.wav';
import { useProfile } from '../composables/useProfile.js';

const { getTooltip } = useTooltip();
const profile = useProfile();

// --- Build skill sets ---
const skillSets = Object.entries(skillClass).map(([className, categories]) => {
  const filteredCategories = Object.fromEntries(
    Object.entries(categories)
      .filter(([cat]) => cat !== 'Mastery')
      .map(([cat, skills]) => [
        cat,
        skills.map((s) => ({
          name: s.skill || s,
          origin: className,
        })),
      ])
  );
  return { name: className, categories: filteredCategories };
});

// Visible sets: always include Novice + currently selected class
const visibleSkillSets = computed(() =>
  skillSets.filter((s) => s.name === 'Novice' || s.name === profile.class)
);

// --- Build Masteries ---
const masterySkills = Object.entries(skillClass)
  .filter(([className]) => className !== 'Novice')
  .flatMap(([className, classData]) =>
    (classData.Mastery || []).map((s) => ({
      name: s.skill || s,
      origin: className,
    }))
  );

const novice = skillSets.find((s) => s.name === 'Novice');
if (novice) novice.categories['Universal Masteries'] = masterySkills;

// --- Hotbar: 12 slots ---
const hotbar = ref(
  Array.from({ length: 12 }, (_, i) => ({ slot: i, skill: null }))
);

// --- Hover state for highlighting ---
const hoverIndex = ref(null);

// --- Drag from pool ---
function handleDragStart(e, skill) {
  e.dataTransfer.setData('skill', JSON.stringify(skill));
}

// --- Drop into slot ---
function handleHotbarDrop(e, index) {
  try {
    const skillData = JSON.parse(e.dataTransfer.getData('skill'));
    if (!skillData) return;
    hotbar.value[index].skill = skillData;
  } catch (_err) {
    console.error('Drop parse failed:', _err);
  } finally {
    hoverIndex.value = null;
  }
}

// --- Swap slots ---
function swapSlots(from, to) {
  const temp = hotbar.value[from].skill;
  hotbar.value[from].skill = hotbar.value[to].skill;
  hotbar.value[to].skill = temp;
}

// --- Clear all slots ---
function clearHotbar() {
  hotbar.value.forEach((slot) => (slot.skill = null));
}

// --- Hover sound ---
const hoverSound = new Audio(hoverSoundFile);

hoverSound.preload = 'auto';
hoverSound.volume = 0.8;
function playHoverSound() {
  hoverSound.currentTime = 0;
  hoverSound.play().catch(() => {}); // catch autoplay errors
}

// --- Fallback image handler ---
function fallbackImage(item, img) {
  try {
    if (img && typeof img === 'object') img.onerror = null;

    // Final stable fallback (use absolute path from public/)
    // Set img.src directly to ensure only one change, return nothing.
    if (img && img.src !== '/images/misc/_errorIco.png') {
      img.src = '/images/misc/_errorIco.png';
    }
    return;
  } catch {
    if (img) img.src = '/images/misc/_errorIco.png';
    return;
  }
}
</script>

<template>
  <h2>Drag Skills Into Hotbar</h2>
  <pre class="hotbar-pre">Hotbar: {{ hotbar }}</pre>

  <section class="container">
    <!-- Skill Pool -->
    <div class="box">
      <h3>Skill Pool</h3>

      <div
        v-for="set in visibleSkillSets"
        :key="set.name"
        class="class-container"
      >
        <h2>{{ `${set.name} Skills` }}</h2>

        <div
          v-for="(skills, category) in set.categories"
          :key="category"
          class="category-section"
        >
          <h3>{{ category }}</h3>

          <div class="icon-container">
            <div
              v-for="item in skills"
              :key="item.name"
              draggable="true"
              @dragstart="(e) => handleDragStart(e, item)"
            >
              <SkillIcon
                :item="item"
                :playHoverSound="playHoverSound"
                :getTooltip="getTooltip"
                :fallbackImage="fallbackImage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hotbar -->
    <div class="hotbar-box">
      <div class="hotbar-header">
        <h3>Hotbar (12 Slots)</h3>
        <button @click="clearHotbar" class="clear-btn">Clear All</button>
      </div>

      <div class="hotbar">
        <div
          v-for="(slot, index) in hotbar"
          :key="slot.slot"
          class="draggable-item hotbar-slot"
          :class="{ hovered: hoverIndex === index }"
          draggable="true"
          @dragstart="(e) => e.dataTransfer.setData('slot', index)"
          @dragover.prevent="hoverIndex = index"
          @dragleave="hoverIndex = null"
          @drop="
            (e) => {
              const fromIndex = e.dataTransfer.getData('slot');
              if (fromIndex !== '') swapSlots(Number(fromIndex), index);
              else handleHotbarDrop(e, index);
            }
          "
        >
          <SkillIcon
            v-if="slot.skill"
            :item="slot.skill"
            :playHoverSound="playHoverSound"
            :getTooltip="getTooltip"
            :fallbackImage="fallbackImage"
          />
          <span v-else class="empty-slot">{{ index + 1 }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  gap: 20px;
}

.box {
  /* flex: 1; */
  padding: 10px;
  border: 2px solid #aaa;
  border-radius: 6px;
  background: var(--bg-color);
  width: 700px;
  height: 360px;
  overflow-y: auto;
}

.hotbar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  border: 2px solid #aaa;
  border-radius: 6px;
  background: var(--bg-color);
  height: fit-content;
  margin: 0 auto;
}

.hotbar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.clear-btn:hover {
  background-color: #c0392b;
}

.class-container {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.category-section {
  margin-bottom: 10px;
}

.icon-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* hotbar layout */
.hotbar {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  min-height: 120px;
}

.hotbar-slot {
  position: relative;
  width: 72px;
  height: 72px;
  margin: 4px;
  background: url('/images/misc/bk_02.png') center/72px 72px no-repeat;
  image-rendering: pixelated;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #aaa;
  transition: background 0.2s;
}

/* .hotbar-slot.hovered {
  outline: 4px solid #0f0;
  outline-offset: -4px;
} */

.empty-slot {
  color: #888;
  font-weight: bold;
}

.hotbar-pre {
  background: #222;
  color: #0f0;
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
  overflow-y: scroll;
  max-height: 100px;
  max-width: 600px;
}
</style>
