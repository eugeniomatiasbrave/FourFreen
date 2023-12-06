import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';


	export const actions = {
		
		addProd: async ({ request, locals }) => {
			const formData = await request.formData();
			const nombre = formData.get('nombre');
			const precio = parseFloat(formData.get('precio'));
			//console.log('producto:', nombre, precio, locals.token, BASE_URL);
			try {
				const res = await fetchApi.post({
					url: BASE_URL + '/productos',
					token: locals.token,
					body: {
						nombre: nombre,
						precio: precio
					},
					resStatus: 200
				});
				if (res.status === 200) {
					const datos = await res.json();
					return {
						success: true,
						message: 'Producto agregado correctamente!!!',
						product: {
							nombre: datos.nombre,
							precio: datos.precio
						}
					};
				} else {
					//return { success: false };
				}
			} catch (err) {
				console.error('Error: ', err);
				throw error(500, 'Algo salió mal al agregar el producto');
			}
			return { success: true, message: 'Producto agregado correctamente!!!' };
		}
	
	}	

