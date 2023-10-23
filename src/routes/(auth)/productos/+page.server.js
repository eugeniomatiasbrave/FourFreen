 //import { redirect } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';
import { BASE_URL } from '../../../lib/utils.js';
import {fetchApi} from '../../../lib/fetchApi.js';



export const load = async ({ locals }) => {
  const getProductos = async () => {
    return await fetchApi.get({url: BASE_URL + "/productos", token: locals.token, resStatus: 200})
  }
  return {
    productos: getProductos(),
  }

}  



export const actions= {
  addProd: async ({ request, locals }) => {
    const formData = await request.formData();
    const nombre = formData.get('nombre');
    const precio = formData.get('precio');
    console.log("producto:", nombre, precio, locals.token, BASE_URL)
    try {

 // quité el const res = ...//
      await fetchApi.post({url: BASE_URL + "/productos", token: locals.token, body:{
          "nombre": nombre,
          "precio": parseFloat(precio)
        }, resStatus: 200})

        return { success: true }
    } catch (err) {
      console.log('Error: ', err);
      throw error(500, 'Something went wrong logging in');
    }

  },

  delete: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('producto_id');
    //const nombre = formData.get('nombre');
    //const precio = formData.get('precio');
    try {
  // quité el const res = ...//
      await fetchApi.delete({url: BASE_URL + `/productos/${id}`, token: locals.token, body:{
        "id": id,
         // "nombre": nombre,
         // "precio": parseFloat(precio)
        }, resStatus: 200})
        return { success: true }
    } catch (err) {
      console.log('Error: ', err);
      throw error(500, 'Something went wrong logging in');
    }
  },


  editar: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('producto_id');
    const nombre = formData.get('nombre');
    const precio = formData.get('precio');
    
    try {
      await fetchApi.patch({url: BASE_URL +`/productos/${id}`, token: locals.token, body:{
          //"id": id,
          "nombre": nombre,
          "precio": parseFloat(precio)
        }, resStatus: 200})
        return { success: true }
    } catch (err) {
      console.log('Error: ', err);
      throw error(500, 'Something went wrong logging in');
    }
  }
 
};





































