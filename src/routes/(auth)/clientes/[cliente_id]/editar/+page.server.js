import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
import { z } from 'zod';

const ClienteSchema = z.object({
	cliente_id: z.string(),
	razon_social: z.string(),
	cuit: z.number(),
	domicilio_calle: z.string(),
	domicilio_altura: z.string(),
	localidad: z.string(),
	codigo_postal: z.string(),
	telefono: z.string(),
	email: z.string().email(),
});

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const data = {
			cliente_id : formData.get('cliente_id'),
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
			const res = await fetchApi.patch({
				url: BASE_URL + `/clientes/${data.cliente_id}`,
				token: locals.token,
				body: {
					razon_social: data.razon_social,
					cuit: parseInt(data.cuit),
					domicilio_calle: data.domicilio_calle,
					domicilio_altura: data.domicilio_altura,
					localidad: data.localidad,
					codigo_postal: data.codigo_postal,
					telefono: data.telefono,
					email: data.email,
				  },
				  resStatus: 200		
			});

		    if (!result.success === 200) {
				const datos = await res.json();
				return { 
				  success: true, 
				  message:'Cliente actualizado correctamente!!!',
				  clienteActualizado: {
					razon_social: datos.razon_social,
					cuit: parseInt(datos.cuit),
					domicilio_calle: datos.domicilio_calle,
					domicilio_altura: datos.domicilio_altura,
					localidad: datos.localidad,
					codigo_postal: datos.codigo_postal,
					telefono: datos.telefono,
					email: datos.email,
				  }
				};
			  } else {
				//return { success: false };
			  }
			} catch (err) {
			  console.log('Error: ', err);
			  throw error(500, 'Algo salió mal al actualizar el producto');
			}
			  return { success: true, message:'Cliente actualizado correctamente!!!'};
		  }
		}