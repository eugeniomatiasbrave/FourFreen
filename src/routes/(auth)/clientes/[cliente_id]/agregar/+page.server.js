import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
import { z } from 'zod';

const ClienteSchema = z.object({
	razon_social: z.string(),
	cuit: z.number(),
	domicilio_calle: z.string(),
	domicilio_altura: z.string(),
	localidad: z.string(),
	codigo_postal: z.string(),
	telefono: z.string(),
	email: z.string().email(),
});


export const load = async ({ locals}) => {
	const getClientes = async () => {
	   return await fetchApi.get({ url: BASE_URL + '/clientes', token: locals.token, resStatus: 200 }); 
	   }
	   return {
		clientes: getClientes()
	   };
  }

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = {
			razon_social: formData.get('razon_social'),
			cuit: parseInt(formData.get('cuit')),
			domicilio_calle: formData.get('domicilio_calle'),
			domicilio_altura: formData.get('domicilio_altura'),
			localidad: formData.get('localidad'),
			codigo_postal: formData.get('codigo_postal'),
			telefono: formData.get('telefono'),
			email: formData.get('email'),
		};

		const result = ClienteSchema.safeParse(data);
		if (!result.success) {
			throw error(400, 'Los datos del formulario son inválidos');
		}

		try {
			const res = await fetchApi.post({
				url: BASE_URL + '/clientes',
				token: locals.token,
				body: result.data, 
				resStatus: 200
			});

			if (res.status !== 200) {
				//return { success: false };
			}
		} catch (err) {
			console.log('Error: ', err);
			return { error: 'Algo salió mal al agregar el cliente',success: false  };
			
		}
		return { success: true, message: `Cliente ${data.razon_social} agregado correctamente!!!`};
	}
}