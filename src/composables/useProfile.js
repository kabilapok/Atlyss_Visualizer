import { reactive } from 'vue';

const state = reactive({
  nick: '',
  class: 'Novice',
  race: 'poon',
  level: { min: 1, max: 32, value: 32 },
});

export function useProfile() {
  return state;
}
