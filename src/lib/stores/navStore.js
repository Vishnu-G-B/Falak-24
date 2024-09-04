import {writable} from 'svelte/store';

export const isNavbarOpen = writable(false);

export function toggleNavbar() {
    isNavbarOpen.update(value => {
        // console.log('Toggling navbar, new value:', !value);
        return !value;
    });
}