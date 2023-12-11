//import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';

export async function load({ params,locals}) {

  const {producto_id} = params
  const getProducto =  async () => {
	const producto = await fetchApi.get({ url: BASE_URL + `/productos/${producto_id}`, token: locals.token, resStatus: 200});
		return producto
	    }
		return {  
		  producto:await getProducto()
  };
}