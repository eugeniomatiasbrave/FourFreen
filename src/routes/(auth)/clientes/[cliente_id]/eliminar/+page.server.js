import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const cliente_id = formData.get('cliente_id');
		console.log('Cliente:',cliente_id, locals.token, BASE_URL);
		try {
			const res = await fetchApi.delete({
				url: BASE_URL + `/clientes/${cliente_id}`,
				token: locals.token,
				body: {
					cliente_id: cliente_id
				},
				resStatus: 200
			});
			if (res.status === 200) {
				const datos = await res.json();
				return { 
				  success: true, 
				  message:'Cliente actualizado correctamente!!!',
				  clienteEliminado: {
					cliente_id: datos.cliente_id		
				  }
				};	
			} else {
				//return { success: false };
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Algo salió mal al eliminar el producto');
		}
		return { success: true, message: 'Cliente eliminado correctamente!!!' };
	}
}