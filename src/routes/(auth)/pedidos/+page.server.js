/*
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';


export const load = async ({ locals, url }) => {

	const estadoId = url.searchParams.get('estado_id');
	
	const getPedidos=  async () => {
		console.log('Estado pedidos server:', url.searchParams);
		
		let localUrl = '/pedidos';
		
		if (estadoId !== null) {
			localUrl += '?estado_id=' + estadoId;
		}
		console.log('url:', localUrl);
		const pedidos = await fetchApi.get({ url: BASE_URL + localUrl, token: locals.token, resStatus: 200 });	 
	    return pedidos;
	}

	   return {
		pedidos: await getPedidos(),
		
	};
};
*/
import { fetchApi } from '$lib/fetchApi';
import { BASE_URL } from '$lib/utils.js';

export const load = async ({ locals }) => {


  const getPedidos = async () => {
    const pedidos = await fetchApi.get({url: BASE_URL + "/pedidos",token: locals.token,resStatus: 200});
    return pedidos;
  };
    return {
		pedidos: await getPedidos(),
	};
  }


