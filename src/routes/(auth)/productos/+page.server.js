import { BASE_URL } from '$lib/utils.js';
import {fetchApi} from '$lib/fetchApi.js';


export const load = async ({ locals,url }) => {
  
  const search = url.searchParams.get('search');
  const sort = url.searchParams.get('sort');

  const getProductos = async () => {
      return await fetchApi.get({url: BASE_URL + `/productos?search=${search}`, token: locals.token, resStatus: 200})
    }

    const getSortPrecio = async () => {
      return await fetchApi.get({url: BASE_URL + `/productos?sort=precio:${sort}`, token: locals.token, resStatus: 200})
    }
    return {
      productos: getProductos(),
      sortPrecio: getSortPrecio()
      
    }
  }  
  
 