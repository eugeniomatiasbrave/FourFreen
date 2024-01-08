import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
//import { error } from '@sveltejs/kit';

export const load = async ({ locals, params}) => {
	const { pedido_estado_id } = params;

	const PedidoEstadoId = async () => {
		const pedidoEstadoId = await fetchApi.get({
			url: BASE_URL + `/pedidos_estado/${pedido_estado_id}`,
			token: locals.token,
			resStatus: 200
		});
		return pedidoEstadoId;
	};

const PedidosEstados = async () => {
	const pedidosEstados = await fetchApi.get({
		url: BASE_URL + '/pedidos_estado',
		token: locals.token,
		resStatus: 200
	});
	return pedidosEstados;
};

	return {
		pedidoEstadoId: await PedidoEstadoId(),
		pedidosEstados: await PedidosEstados()
	};
};


/*
export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const pedido_estado_id = formData.get('pedido_estado_id');
		const nombre = formData.get('nombre');
		const modificable = formData.get('modificable');
		const anulable = formData.get('anulable');

		//console.log('estado:', pedido_estado_id, nombre, modificable, anulable, locals.token, BASE_URL);

		try {
			const res = await fetchApi.post({
				url: BASE_URL + '/pedidos',
				token: locals.token,
				body: {
					pedido_estado_id: pedido_estado_id,
					nombre: nombre,
					modificable: modificable,
					anulable: anulable
				},
				resStatus: 200
			});

			if (res.status === 200) {
				const datos = await res.json();
				console.log(datos);
			} else {
				//  return { success: false };
			}
		} catch (err) {
			// console.log('Error: ', err);
			throw error(500, 'Algo salió mal al agregar el pedido');
		}
		return { success: true, message: 'Pedido agregado correctamente!!!' };
	}
};
*/