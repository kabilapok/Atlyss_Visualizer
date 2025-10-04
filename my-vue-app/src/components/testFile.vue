<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

// initial pool of skills
const skillPool = ref(['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']);

// empty hotbar to drop into
const hotbar = ref([]);
</script>

<template>
  <h2>Drag Skills Into Hotbar</h2>

  <section class="container">
    <!-- Pool of available skills -->
    <div class="box">
      <h3>Skill Pool</h3>
      <draggable v-model="skillPool" group="skills" item-key="name">
        <template #item="{ element }">
          <div class="draggable-item">{{ element }}</div>
        </template>
      </draggable>
    </div>

    <!-- Hotbar -->
    <div class="box">
      <h3>Hotbar</h3>
      <draggable v-model="hotbar" group="skills" item-key="name">
        <template #item="{ element }">
          <div class="draggable-item hotbar-slot">{{ element }}</div>
        </template>
      </draggable>
    </div>
  </section>

  <pre>Hotbar: {{ hotbar }}</pre>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.box {
  width: 45%;
  padding: 10px;
  border: 2px solid #aaa;
  border-radius: 6px;
  background: #f8f8f8;
}

.draggable-item {
  padding: 10px;
  margin: 5px 0;
  background: #ddd;
  border: 1px solid #aaa;
  border-radius: 6px;
  cursor: grab;
}

.hotbar-slot {
  background: #cce5ff;
}
</style>
