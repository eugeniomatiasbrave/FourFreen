import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

const productoSchema = z.object({
	nombre: z.string().min(1),
	precio: z.number(),
	producto_id: z.string().optional()
});

const validateData = async (request, schema) => {
	const formData = await request.formData();
	const data = {
		nombre: formData.get('nombre'),
		precio: parseFloat(formData.get('precio')),
		producto_id: formData.get('producto_id')
	};
	const result = schema.safeParse(data);
	if (!result.success) {
		console.log(result.error);
		error(400, { message: 'Error 400: Datos del formulario incorrectos', hint: 'Prueba nuevamente' });
	}
	return result.data;
};

const handleApiError = (err, message) => {
	console.error('Error: ', err);
	error(404, { message, hint: 'Prueba nuevamente' });
};

export const load = async ({ locals, params }) => {
	const { producto_id } = params;
	const getProductosId = async () => {
		return await fetchApi.get({ url: BASE_URL + `/productos/${producto_id}`, token: locals.token, resStatus: 200 });
	};
	const getProductos = async () => {
		return await fetchApi.get({ url: BASE_URL + '/productos', token: locals.token, resStatus: 200 });
	};
	return {
		productosId: await getProductosId(),
		productos: await getProductos()
	};
};

export const actions = {
	agregar: async ({ request, locals }) => {
		const data = await validateData(request, productoSchema.omit({ producto_id: true }));

		try {
			const res = await fetchApi.post({
				url: BASE_URL + '/productos',
				token: locals.token,
				body: data,
				resStatus: 200
			});
			if (res.status === 200) {
				const datos = await res.json();
				return {
					success: true,
					message: 'Producto agregado correctamente!!!',
					productoAgregado: datos
				};
			}
		} catch (err) {
			handleApiError(err, 'Error 404: Producto no agregado');
		}
		return { success: true, message: `Producto ${data.nombre} agregado correctamente!!!` };
	},

	editar: async ({ request, locals }) => {
		const data = await validateData(request, productoSchema);
		try {
			const res = await fetchApi.patch({
				url: BASE_URL + `/productos/${data.producto_id}`,
				token: locals.token,
				body: data,
				resStatus: 200
			});
			if (res.status === 200) {
				const datos = await res.json();
				return {
					success: true,
					message: 'Producto editado correctamente!!!',
					productoActualizado: datos
				};
			}
		} catch (err) {
			handleApiError(err, 'Error 404: Producto no editado');
		}
		return { success: true, message: `Producto ${data.nombre} editado correctamente!!!` };
	},

	eliminar: async ({ request, locals }) => {
		const formData = await request.formData();
		const producto_id = formData.get('producto_id');
		try {
			await fetchApi.delete({
				url: BASE_URL + `/productos/${producto_id}`,
				token: locals.token,
				body: { producto_id },
				resStatus: 200
			});
		} catch (err) {
			handleApiError(err, 'Error 404: Producto no eliminado');
		}
		return { success: true, message: `Producto Id: ${producto_id}, eliminado correctamente!!!` };
	}
};
