

import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';

export const load = async ({ locals, url }) => {
	const getPedidos = async () => {
		console.log('Estado pedidos server:', url.searchParams);
		const estadoId = url.searchParams.get('estado_id');
		let localUrl = '/pedidos';
		if (estadoId !== null) {
			localUrl += '?estado_id=' + estadoId;
		}
		console.log('url:', localUrl);
		return await fetchApi.get({ url: BASE_URL + localUrl, token: locals.token, resStatus: 200 });   
	};
	return {
		pedidos: await getPedidos()
	};
};
