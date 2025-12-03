<script>
  import { skillStore } from '../lib/stores/skillStore.js';
  import { createTooltipContent } from '../utils/tooltip.js';
  import tippy from 'tippy.js';

  let activeDragOverIndex = -1;
  let passiveDragOver = false;

  function handleDragStart(event, fromIndex, skill, sourceBar) {
    if (!skill) return;
    const payload = {
      source: sourceBar, // 'activeSkillbar' or 'passiveSkillbar'
      name: skill.name,
      category: skill.class,
      fromIndex: fromIndex,
    };
    event.dataTransfer.setData('text/plain', JSON.stringify(payload));
    event.dataTransfer.effectAllowed = 'move';
  }

  function handleActiveDrop(event, toIndex) {
    event.preventDefault();
    const payload = JSON.parse(event.dataTransfer.getData('text/plain'));
    if (!payload) return;
    
    // This function now specifically handles drops on the active bar
    skillStore.moveToActiveSkillbar(payload, toIndex);
    activeDragOverIndex = -1;
  }

  function handlePassiveDrop(event) {
    event.preventDefault();
    const payload = JSON.parse(event.dataTransfer.getData('text/plain'));
    if (!payload) return;
    
    // This function handles drops on the passive bar
    skillStore.moveToPassiveSkillbar(payload);
    passiveDragOver = false;
  }

  function tooltip(el, skill) {
    if (!skill) return;
    tippy(el, {
      allowHTML: true,
      content: createTooltipContent(skill),
      placement: 'top',
      delay: [150, 0]
    });
  }
</script>

<div class="skillbar-container">
  <!-- Active Skillbar -->
  <div class="bar-section">
    <h3>Skillbar (Active)</h3>
    <div class="skillbar-grid-active">
      {#each $skillStore.activeSkillbar as skill, i}
        <div
          class="skill-slot"
          class:drag-over={activeDragOverIndex === i}
          on:dragenter|preventDefault={() => activeDragOverIndex = i}
          on:dragleave|preventDefault={() => activeDragOverIndex = -1}
          on:dragover|preventDefault={(e) => { e.dataTransfer.dropEffect = 'move'; }}
          on:drop={(event) => handleActiveDrop(event, i)}
        >
          {#if skill}
            <div class="item-content" use:tooltip={skill} draggable="true" on:dragstart={(event) => handleDragStart(event, i, skill, 'activeSkillbar')}>
              <div class="bg-bottom"></div>
              <img src={skill.url} alt={skill.name} draggable="false" class:failed={!skill.loaded} class="skill-icon"/>
              <div class="bg-top"></div>
            </div>
          {:else}
            <div class="item-content-placeholder"><p class="slot-index">{i + 1}</p></div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <!-- Passive Skillbar -->
  <div class="bar-section" class:visible={$skillStore.passiveSkillbar.length > 0}>
    <h3>Activated Passives</h3>
    <div
      class="skillbar-grid-passive"
      class:drag-over={passiveDragOver}
      on:dragenter|preventDefault={() => passiveDragOver = true}
      on:dragleave|preventDefault={() => passiveDragOver = false}
      on:dragover|preventDefault={(e) => { e.dataTransfer.dropEffect = 'move'; }}
      on:drop={handlePassiveDrop}
    >
      {#each $skillStore.passiveSkillbar as skill, i (skill.name)}
        <div class="skill-slot">
          <div class="item-content" use:tooltip={skill} draggable="true" on:dragstart={(event) => handleDragStart(event, i, skill, 'passiveSkillbar')}>
            <div class="bg-bottom"></div>
            <img src={skill.url} alt={skill.name} draggable="false" class:failed={!skill.loaded} class="skill-icon"/>
            <div class="bg-top"></div>
          </div>
        </div>
      {:else}
        <div class="item-content-placeholder passive-placeholder">
          <p>Drag Passive Skills Here</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .bar-section {
    margin-top: 2rem;
    display: none; /* Hidden by default for passive bar */
  }
  .bar-section:first-child,
  .bar-section.visible {
    display: block; /* Always show active, show passive when visible */
  }
  .skillbar-grid-active {
    display: grid;
    grid-template-columns: repeat(6, 72px);
    grid-template-rows: repeat(2, 72px);
    gap: 5px;
    width: fit-content;
  }
  .skillbar-grid-passive {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    width: fit-content;
    min-height: 80px;
    padding: 5px;
    border: 2px dashed #444;
    transition: border-color 0.2s ease, background-color 0.2s ease;
  }
  .skillbar-grid-passive.drag-over {
    border-color: #888;
    background-color: #2a2a2a;
  }
  .skill-slot {
    width: 72px;
    height: 72px;
    border: 1px solid #555;
    background-color: #222;
    position: relative;
    transition: background-color 0.2s ease;
  }
  .skill-slot.drag-over {
    background-color: #444;
    border-color: #888;
  }
  .item-content-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #444;
    font-size: 2rem;
    text-align: center;
    line-height: 1;
  }
  .passive-placeholder {
      font-size: 1rem;
      padding: 5px;
  }
  .item-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
  }
  .skill-icon {
    width: 60px;
    height: 60px;
    pointer-events: none;
    image-rendering: pixelated;
    z-index: 2;
  }
  .bg-bottom {
    position: absolute; inset: 0;
    background: url('/images/misc/bk_02.png') center/72px 72px no-repeat;
    image-rendering: pixelated;
    z-index: 1;
  }
  .bg-top {
    position: absolute; inset: 0;
    background: url('/images/misc/bkOver_01.png') center/68px 68px no-repeat;
    image-rendering: pixelated;
    z-index: 3;
  }
</style>