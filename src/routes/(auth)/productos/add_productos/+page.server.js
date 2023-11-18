
import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import {fetchApi} from '$lib/fetchApi.js';

export const actions= {
  addProd: async ({ request, locals, cookies }) => {
    const formData = await request.formData();
    const nombre = formData.get('nombre');
    const precio = formData.get('precio');
    console.log("producto:", nombre, precio, locals.token, BASE_URL)

    try {
      const res = await fetchApi.post({
        url: BASE_URL + "/productos",
        token: locals.token,
        body: {
          "nombre": nombre,
          "precio": parseFloat(precio)
        },
        resStatus: 200
      });
      
      if (res.status === 200) {
        const datos = await res.json();
        
         cookies.set('Producto', JSON.stringify({
           nombre: datos.nombre,
           precio: datos.precio
         }), {
           httpOnly: true,
           path: '/',
           secure: true,
           sameSite: 'strict',
           maxAge: 60 * 60 * 24 // 1 day
         })
            
      } else {
       //return { success: false };
      }
    } catch (err) {
      console.log('Error: ', err);
      throw error(500, 'Algo salió mal al agregar el producto');
    } 

    return { success: true, message: 'Producto agregado correctamente!!!'} 
   }
};





































