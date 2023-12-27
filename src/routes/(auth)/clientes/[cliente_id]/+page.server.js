import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
import { z } from 'zod';



export const load = async ({ locals, params}) => {

	const {cliente_id} = params;
    const getClienteId = async () => {
	    return await fetchApi.get({ url: BASE_URL + `/clientes/${cliente_id}`, token: locals.token, resStatus: 200 });	
    }

	const getClientes = async () => {
		try {
			const clientes = await fetchApi.get({url: BASE_URL + '/clientes',token: locals.token,resStatus: 200});
			return clientes;
		} catch (err) {
			console.error('Error: ', err);
			throw error(500, 'Algo salio mal con la peticion de los clientes', err);
		}
	};

	return {
		clientes: await getClientes(),
		clienteId: await getClienteId()
	};
}

export const actions = {

	agregar: async ({ request, locals }) => {

		const ClienteSchemaAgregar = z.object({
			razon_social: z.string(),
			cuit: z.number(),
			domicilio_calle: z.string(),
			domicilio_altura: z.string(),
			localidad: z.string(),
			codigo_postal: z.string(),
			telefono: z.string(),
			email: z.string().email(),
		});

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

		const result = ClienteSchemaAgregar.safeParse(data);
		if (!result.success) {
			throw error ( 400, {message: 'Error 400: Datos del formulario incorrectos', hint: 'Prueba nuevamente'} )
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
			throw error ( 404, {message: 'Error 404: Cliente no agregado', hint: 'Prueba nuevamente'} )
			
		}
		return { success: true, message: `Cliente ${data.razon_social} agregado correctamente!!!`};
	},

	
	editar: async ({ request, locals }) => {

		const ClienteSchemaEditar = z.object({
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

		const result = ClienteSchemaEditar.safeParse(data);

		if (!result.success) {
			throw error ( 400, {message: 'Erroe 400: datos del formulario son inválidos', hint: 'Prueba nuevamente'} )
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
			  throw error ( 404, {message: 'Error 404: Cliente no editado', hint: 'Prueba nuevamente'} )
			}		
		   return { success: true, message:`Cliente ${data.razon_social} editado correctamente!!!`};
		  },

		  eliminar: async ({ request, locals }) => {
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
					  message:'Cliente eliminado correctamente!!!',
					  clienteEliminado: {
						cliente_id: datos.cliente_id		
					  }
					};	
				} else {
					//return { success: false };
				}
			} catch (err) {
				console.log('Error: ', err);
				throw error ( 404, {message: 'Error 404: Cliente no eliminado', hint: 'Prueba nuevamente'} )
			}
			return { success: true, message: `Cliente Id: ${cliente_id} eliminado correctamente!!!` };
		}
}