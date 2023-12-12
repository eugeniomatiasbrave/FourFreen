

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
		const pedidos = await fetchApi.get({ url: BASE_URL + localUrl, token: locals.token, resStatus: 200 });
	    return pedidos;
	};

	const getProductos = async () => {
		const productos = await fetchApi.get({url: BASE_URL + '/productos',token: locals.token,resStatus: 200
		});
		return productos;
	};

	const getClientes = async () => {
		const clientes = await fetchApi.get({ url: BASE_URL + '/clientes', token: locals.token, resStatus: 200 });
	     return clientes;
	};

	return {
		pedidos: await getPedidos(),
		productos:await getProductos(),
		clientes: await getClientes()
	};
};


























