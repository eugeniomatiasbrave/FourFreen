import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';

export const load = async ({ locals, url }) => {
	
	const estado_id = url.searchParams.get('estado_id');
	
	const getPedidos=  async () => {
		console.log('Estado pedidos server:', url.searchParams);
		
		let localUrl = '/pedidos';
		
		if (estado_id !== null) {
			localUrl += '?estado_id=' + estado_id;
		}
		console.log('url:', localUrl);
		const pedidos = await fetchApi.get({ url: BASE_URL + localUrl, token: locals.token, resStatus: 200 });	 
	    return pedidos;
	}

	//const estado = url.searchParams.get('pedidos?estado_id=' + estado_id);

	   return {
		pedidos: await getPedidos(),
		//estado: estado
		
	};
};
 
