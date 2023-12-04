import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
//import { productosStore } from '$lib/miStores.js';

export const load = async ({ locals, url }) => {
  const search = url.searchParams.get('search');
  const sort = url.searchParams.get('sort');
  

  const fetchProductos = async (queryParams = '') => {
    try {
      const productos = await fetchApi.get({ url: BASE_URL + '/productos' + queryParams, token: locals.token, resStatus: 200 });
      return productos;
    } catch (err) {
      console.error('Error original: ', err);
      throw error(500, 'Algo salio mal con la peticion de los productos', err);
    }
  };

  const productos = await fetchProductos();
  const productosSearch = search ? await fetchProductos(`?search=${search}`) : productos;
  const sortPrecio = sort === 'precio' ? await fetchProductos(`?sort=precio:${sort}`) : productos;
  const sortNombre = sort === 'nombre' ? await fetchProductos(`?sort=nombre:${sort}`) : productos;
  const sortProducto_id = sort === 'producto_id' ? await fetchProductos(`?sort=producto_id:${sort}`) : productos;

  return {
    productos,
    productosSearch,
    sortPrecio,
    sortNombre,
    sortProducto_id
  };
};