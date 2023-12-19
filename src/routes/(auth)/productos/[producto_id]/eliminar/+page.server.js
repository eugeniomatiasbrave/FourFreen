import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';


export const load = async ({ locals,params}) => {
	const {producto_id} = params;
	const getProductosId = async () => {
	
		const productosId = await fetchApi.get({ url: BASE_URL + `/productos/${producto_id}`, token: locals.token, resStatus: 200 });
		return productosId;	
	    }
	return {
		productosId: await getProductosId()
     }
}

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
				const res = await res.json();
				}                       
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Algo salió mal al eliminar el producto');
		}
		return { success: true, message: `Producto eliminado correctamente!!!`, producto_id: producto_id };
	}
};































