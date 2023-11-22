import { BASE_URL } from '$lib/utils.js';
import {fetchApi} from '$lib/fetchApi.js';


export const load = async ({ locals,url }) => {
  
  const search = url.searchParams.get('search');

  const getProductos = async () => {
    
      return await fetchApi.get({url: BASE_URL + `/productos?search=${search}`, token: locals.token, resStatus: 200})
    }


    return {
      productos: getProductos(),
      
    }
  }  
  
 