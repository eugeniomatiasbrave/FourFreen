import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const producto_id = formData.get('producto_id');
		console.log('Producto:',producto_id, locals.token, BASE_URL);
		try {
			const res = await fetchApi.delete({
				url: BASE_URL + `/productos/${producto_id}`,
				token: locals.token,
				body: {
					producto_id: producto_id
				},
				resStatus: 200
			});
			if (res.status === 200) {
				const datos = await res.json();
				return { 
				  success: true, 
				  message:'Producto actualizado correctamente!!!',
				  productoEliminado: {
					producto_id: datos.producto_id		
				  }
				};	
			} else {
				//return { success: false };
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Algo salió mal al eliminar el producto');
		}
		return { success: true, message: 'Producto eliminado correctamente!!!' };
	}
}