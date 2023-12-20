import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
import { z } from 'zod';

const productoSchema = z.object({
  producto_id: z.string(),
  nombre: z.string().min(1),
  precio: z.number(),
});

export const load = async ({ locals,params}) => {
 const {producto_id} = params;

 const getProductosId = async () => {
		const productosId = await fetchApi.get({ url: BASE_URL + `/productos/${producto_id}`, token: locals.token, resStatus: 200 });
		 return productosId;	
    }

 const getProductos = async () => {
    return await fetchApi.get({ url: BASE_URL + '/productos', token: locals.token, resStatus: 200 });
  }
        
	return {
		productosId: await getProductosId(),
    productos: getProductos()
     }
}

export const actions = {
	default: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = {
      producto_id: formData.get('producto_id'),
      nombre: formData.get('nombre'),
      precio: parseFloat(formData.get('precio')),
    };

    const result = productoSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error);
      throw error(400, 'Datos de formulario inválidos');
    }

    try {
      const res = await fetchApi.patch({
        url: BASE_URL + `/productos/${data.producto_id}`,
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
      return { error: 'Error: 500. Algo salió mal al editar el producto', success: false, nombre: data.nombre,precio: data.precio, producto_id:data.producto_id};
    }
  	return { success: true, message:'Producto editado correctamente!!!' , nombre: data.nombre,precio: data.precio, producto_id:data.producto_id };
  }
 }