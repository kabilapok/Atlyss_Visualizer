const STORAGE_KEY = "Save_v1";
const SLOT_COUNT = 7;

export function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

export function saveAll(data) {
  localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
}

export function saveSection(sectionName, value) {
  const data = loadAll();
  data[sectionName] = value;
  saveAll(data);
}

export function loadSection(sectionName, fallback = {}) {
  const data = loadAll();
  return data[sectionName] ?? fallback;
}

export function saveSlot(sectionName, slotIndex, value) {
  const section = loadSection(sectionName, Array(SLOT_COUNT).fill(null));
  section[slotIndex] = value;
  saveSection(sectionName, section);
}

export function loadSlot(sectionName, slotIndex, fallback) {
  const section = loadSection(sectionName, Array(SLOT_COUNT).fill(null));
  return section[slotIndex] ?? fallback;
}
