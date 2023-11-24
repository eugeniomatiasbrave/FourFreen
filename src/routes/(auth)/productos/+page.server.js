import { BASE_URL } from '$lib/utils.js';
import {fetchApi} from '$lib/fetchApi.js';


export const load = async ({ locals,url }) => {
  
  const search = url.searchParams.get('search');
  const sort = url.searchParams.get('sort');

  const getProductos = async () => {
    return await fetchApi.get({url: BASE_URL + '/productos', token: locals.token, resStatus: 200})
    }

  const getProductosSearch = async () => {
    return await fetchApi.get({url: BASE_URL + `/productos?search=${search}`, token: locals.token, resStatus: 200})
    }

  const getSortPrecio = async () => {
    return await fetchApi.get({url: BASE_URL + `/productos?sort=precio:${sort}`, token: locals.token, resStatus: 200})
    }

    const getSSP = async () => {
      return await fetchApi.get({url: BASE_URL + `/productos?search=${search}&sort=precio:${sort}`, token: locals.token, resStatus: 200})
      }

    return {
      productos: getProductos(),
      productosSearch: getProductosSearch(),
      sortPrecio: getSortPrecio(),
      searchSortPrecio: getSSP()
      
    }
  }  


/*
// recupera todos los productos con limit (cantidad de productos a recuperar) 
// y offset (los que saltea)
// ordenados por el id del producto
GET {{baseUrl}}/productos?offset=5&limit=5&sort=producto_id:1  

*/

