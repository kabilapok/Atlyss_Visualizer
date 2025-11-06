import { writable } from "svelte/store";

export const DEFAULT_LEVEL = 32;
export const defaultLevelValue = writable(DEFAULT_LEVEL);
