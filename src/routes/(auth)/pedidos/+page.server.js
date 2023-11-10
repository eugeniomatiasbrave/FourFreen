//import { error } from '@sveltejs/kit';
import { BASE_URL } from '../../../lib/utils.js';
import { fetchApi } from '../../../lib/fetchApi.js';
import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {

  
  const getPedidos = async () => {
    return await fetchApi.get({ url: BASE_URL + "/pedidos", token: locals.token, resStatus: 200 });
  };
  
  const getProductos = async () => {
    return await fetchApi.get({ url: BASE_URL + "/productos", token: locals.token, resStatus: 200 });
  };

  const getClientes = async () => {
    return await fetchApi.get({ url: BASE_URL + "/clientes", token: locals.token, resStatus: 200 });
  };

  return {
    pedidos: getPedidos(),
    productos: getProductos(),
    clientes: getClientes(),
  };
};

export const actions = {
  addPedido: async ({ request, locals }) => {
    const formData = await request.formData();
    const cliente_id = formData.get('selectedCliente_id');
    const fecha = formData.get('fecha');
    const producto_id = formData.get('selectedProducto_id');
    const total_unidades = formData.get('selectedUnidades');
    const precio = formData.get('precio');
    
   console.log ( "Pedido:", cliente_id,fecha , producto_id, total_unidades, precio, locals.token,BASE_URL)
   
  try {
    const res = await fetchApi.post({
      url: BASE_URL + "/pedidos",
      token: locals.token,
      body: {
         "fecha":fecha, 
         "cliente_id":cliente_id,
         "producto_id":producto_id,
         "total_unidades":total_unidades,
         "precio":precio
         
      },resStatus: 200
      });
  
    if (res.status === 200) {
      
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.log('Error: ', err);
    throw error(500, 'Algo salió mal al agregar el pedido');
  }  
 }
};



















































































