import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';

export const load = async ({ locals, url }) => {
  const sort = url.searchParams.get('sort');

  const fetchProductos = async (queryParams = '') => {
    try {
      const productos = await fetchApi.get({ url: BASE_URL + '/productos' + queryParams, token: locals.token, resStatus: 200 });
      return productos;
    } catch (err) {
      console.error('Error original: ', err);
      error(500, 'Algo salio mal con la peticion de los productos', err);
    }
  };

  return {
    productos: await fetchProductos(),
    productosSearch: await fetchProductos('?search='),
    sortPrecio: await fetchProductos(`?sort=precio:${sort}`),
    sortNombre: await fetchProductos(`?sort=nombre:${sort}`),
    sortProducto_id: await fetchProductos(`?sort=producto_id:${sort}`)
  }
}