import { writable } from 'svelte/store';

export const selectedProducto = writable(null);
export const selectedNombre = writable(null);
export const selectedPrecio = writable(null);
export const formModal = writable(false);
export const formModalEdit = writable(false);
export const formModalDelete = writable(false);

