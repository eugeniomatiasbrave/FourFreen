
import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';

export const load = async ({ locals, url }) => {

	const sort = url.searchParams.get('sort');

	const getPedidos = async () => {
		console.log('Estado pedidos server:', url.searchParams);
		const estadoId = url.searchParams.get('estado_id');
		let localUrl = '/pedidos';
		if (estadoId !== null) {
			localUrl += '?estado_id=' + estadoId;
		}
		console.log('url:', localUrl);
		return await fetchApi.get({ url: BASE_URL + localUrl, token: locals.token, resStatus: 200 });   
	}
	
	
	const getPedidoSearch=async()=>{
		try {
		  const pedidoSearch = await fetchApi.get({url:BASE_URL+'/pedidos?search=',token:locals.token,resStatus:200}) 
		  return pedidoSearch;
		} catch (err) {
			console.error('Error: ', err);
		  throw error(500, 'Algo salio mal al filtrar por nombre de pedido' , err);
		 }     
	   }

	const getSortPedido_id=async()=>{
		try {
		  const sortPedido_id = await fetchApi.get({url:BASE_URL+`/pedidos?sort=pedido_cab_id:${sort}`,token:locals.token,resStatus:200});
		   return sortPedido_id;  
		} catch (err) {
			console.error('Error: ', err);
		  throw error(500, 'Algo salio mal al ordenar los pedidos', err);
		 }     
	   }

	   return {
		pedidos: await getPedidos(),
		pedidoSearch:getPedidoSearch(),
		sortPedido_id:getSortPedido_id()
	};
};
