import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';
import { z } from 'zod';

const productoSchema = z.object({
  nombre: z.string().min(1),
  precio: z.number(),
});

export const load = async ({ locals}) => {
  const getProductos = async () => {
     return await fetchApi.get({ url: BASE_URL + '/productos', token: locals.token, resStatus: 200 }); 
     }
     return {
      productos: getProductos()
     };
}

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = {
      nombre: formData.get('nombre'),
      precio: parseFloat(formData.get('precio')),
    };

    const result = productoSchema.safeParse(data);
    if (!result.success) {
     // console.log(result.error); 
     throw error ( 400, {message: 'Error 400: Producto no agregado', hint: 'Prueba nuevamente'} )
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
  }}