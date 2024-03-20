// src/lib/pedidoStore.js

import { writable } from 'svelte/store';

// Estado inicial del pedido (puedes cambiarlo según tus necesidades)
const initialState = {
  pedido_estado_id: 10,
  nombre: 'Pedido Ingresado',
  modificable: true,
  anulable: true
};

// Crea el store
export const pedidoStore = writable(initialState);
