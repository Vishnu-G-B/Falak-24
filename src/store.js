import {writable} from "svelte/store";

export const loaderPlayed = writable(false);
export const transitionPlaying = writable(false);