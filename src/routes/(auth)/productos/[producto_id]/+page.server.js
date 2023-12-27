import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
import { error } from '@sveltejs/kit';
import { z } from 'zod';


export const load = async ({ locals,params}) => {	
	const {producto_id} = params;
	const getProductosId = async () => {
		 return await fetchApi.get({ url: BASE_URL + `/productos/${producto_id}`, token: locals.token, resStatus: 200 });	
	}
	const getProductos = async () => {
		return await fetchApi.get({ url: BASE_URL + '/productos', token: locals.token, resStatus: 200 });
	}
	return {
		productosId: await getProductosId(),
		productos: await getProductos()
    }
};

export const actions = {
	agregar: async ({ request, locals }) => {

		const productoSchemaAgregar = z.object({
			nombre: z.string().min(1),
			precio: z.number(),
		  });

		const formData = await request.formData();
		const data = {
		  nombre: formData.get('nombre'),
		  precio: parseFloat(formData.get('precio')),
		};
	
		const result = productoSchemaAgregar.safeParse(data);
		if (!result.success) {
		 console.log(result.error); 
		 throw error ( 400, {message: 'Error 400: Datos del formulario incorrectos', hint: 'Prueba nuevamente'} )
		}	  
		try {
		  const res = await fetchApi.post({
			url: BASE_URL + '/productos',
			token: locals.token,
			body: {
			  nombre: data.nombre,
			  precio: data.precio
			},
			resStatus: 200
		  });
		  if (res.status === 200) {
			const datos = await res.json();
			
			return {
			  success: true,
			  message: 'ProductoM agregado correctamente!!!',
			  productoAgregado: {
				nombre: datos.nombre,
				precio: datos.precio
			  }
			};
		  } else {
		   // return { success: true };
		  }
		} catch (err) {
		  console.error('Error: ',err);
		  throw error ( 404, {message: 'Erroe 404 Producto no agregado', hint: 'Prueba nuevamente'} )
		}
		return { success: true, message: `Producto ${data.nombre} agregado correctamente!!!`};
	},

	editar: async ({ request, locals }) => {

		const productoSchemaEditar = z.object({
			producto_id: z.string(),
			nombre: z.string().min(1),
			precio: z.number(),
		  });

		const formData = await request.formData();
		const data = {
		  producto_id: formData.get('producto_id'),
		  nombre: formData.get('nombre'),
		  precio: parseFloat(formData.get('precio')),
		};
		const result = productoSchemaEditar.safeParse(data);
		if (!result.success) {
		  console.log(result.error);
		  throw error ( 400, {message: 'Error 400: datos del formulario son inválidos', hint: 'Prueba nuevamente'} )
		}
		try {
		  const res = await fetchApi.patch({url: BASE_URL + `/productos/${data.producto_id}`,token: locals.token,
		    body: { nombre: data.nombre,precio: data.precio},resStatus: 200});

		  if (res.status === 200) {
			const datos = await res.json();
			return { 
			  success: true, 
			  message:'Producto editado correctamente!!!',
			  productoActualizado: {
				nombre: datos.nombre,
				precio: datos.precio
			  }
			};
		  } else {
			//return { success: false };
		  }
		} catch (err) {
		  console.log('Error: ', err);
		  throw error ( 404, {message: 'Error 404: Producto no editado', hint: 'Prueba nuevamente'} )
		}
		  return { success: true, message:`Producto ${data.nombre} editado correctamente!!!` };
	  },

	eliminar: async ({ request, locals }) => {
		const formData = await request.formData();
		const producto_id = formData.get('producto_id');
		console.log('Producto:',producto_id, locals.token, BASE_URL);
		try {
			const res = await fetchApi.delete({url: BASE_URL + `/productos/${producto_id}`,token: locals.token,
				              body: {producto_id: producto_id},resStatus: 200});

			if (res.status === 200) {
				const res = await res.json();
			}  

		} catch (err) {
			console.log('Error: ', err);
			throw error ( 404, {message: 'Error 404: Producto no eliminado', hint: 'Prueba nuevamente'} )
		}
		return { success: true, message: `Producto Id: ${producto_id}, eliminado correctamente!!!` };
	}
};