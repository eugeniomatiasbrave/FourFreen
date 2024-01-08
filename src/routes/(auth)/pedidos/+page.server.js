//import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
export const load = async ({ locals, url }) => {
	const estadoId = url.searchParams.get('estado_id');
	const getPedidos=  async () => {
		console.log('Estado pedidos server:', url.searchParams);
		let localUrl = '/pedidos';
		let urlLocalNueva = localUrl;
		if (estadoId !== null) {
			urlLocalNueva += '?estado_id=' + estadoId;
		}
		console.log('url:', urlLocalNueva);
		const pedidos = await fetchApi.get({ url: BASE_URL + urlLocalNueva, token: locals.token, resStatus: 200 });	 
	    return pedidos;
	}
	   return {
		pedidos: await getPedidos(),
		estadoId: estadoId
		
	};
};
