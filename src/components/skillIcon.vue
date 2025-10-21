<script setup>
const { item, playHoverSound, getTooltip, fallbackImage } = defineProps({
  item: Object,
  playHoverSound: Function,
  getTooltip: Function,
  fallbackImage: Function,
});

function handleImageError(e) {
  const img = e.target;
  // stop further error callbacks for this element
  img.onerror = null;

  try {
    if (typeof fallbackImage === 'function') {
      const result = fallbackImage(item, img); // caller may set src directly or return a URL
      if (typeof result === 'string' && result !== img.src) {
        img.src = result;
        return;
      }
    }
  } catch {
    // swallow and use default fallback below
  }

  // final fallback (ensure you have this file in project or change path)
  const defaultFallback = './images/misc/_errorIco.png';
  if (img.src !== defaultFallback) img.src = defaultFallback;
}
</script>

<template>
  <div
    v-if="item"
    class="icon"
    @mouseenter="playHoverSound"
    :title="item.name.replace('_', ' ')"
    v-tippy="{
      content: getTooltip(item),
      allowHTML: true,
      theme: 'info',
      hideOnClick: true,
      followCursor: true,
      interactiveDebounce: 75,
      placement: 'top-start',
      offset: [10, 45],
    }"
  >
    <div class="bg-bottom"></div>
    <img
      :src="`./images/${item.origin}-icons/${item.name}.png`"
      :alt="item.name"
      @error="handleImageError"
      draggable="false"
    />
    <div class="bg-top"></div>
  </div>
</template>

<style scoped>
.icon {
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  overflow: hidden;
}

.icon .bg-bottom {
  position: absolute;
  inset: 0;
  background: url('/images/misc/bk_02.png') center/72px 72px no-repeat;
  image-rendering: pixelated;
  z-index: 1;
}

.icon img {
  image-rendering: pixelated;
  position: relative;
  width: 60px;
  height: 60px;
  z-index: 2;
  pointer-events: none;
}

.icon .bg-top {
  position: absolute;
  inset: 0;
  background: url('/images/misc/bkOver_01.png') center/68px 68px no-repeat;
  image-rendering: pixelated;
  z-index: 3;
}
</style>
