import { BASE_URL } from '../../../lib/utils.js';
import { fetchApi } from '../../../lib/fetchApi.js';
import { error } from '@sveltejs/kit';


export const load = async ({ locals,params }) => {

    const getPedidos = async () => {
      return await fetchApi.get({ url: BASE_URL + "/pedidos", token: locals.token, resStatus: 200 }); };
    const getProductos = async () => {
        return await fetchApi.get({ url: BASE_URL + "/productos", token: locals.token, resStatus: 200 }); };
    const getClientes = async () => {
          return await fetchApi.get({ url: BASE_URL + "/clientes", token: locals.token, resStatus: 200 }); };

    const DetallePedido = async (id)=> {
          return await fetchApi.get({ url: BASE_URL + `/pedidos/${id}/detalle`, token: locals.token, resStatus: 200 }); 
                 
        }
          return { 
            pedidos:  await getPedidos(), 
            productos:  await getProductos(),
            clientes:  await getClientes(),  
            detalle: await DetallePedido(params)      
          }; 
           
        };
        
        

export const actions = {
  addPedido: async ({ request, locals }) => {
    const formData = await request.formData();
    const cliente_id = Number(formData.get('cliente_id'));
    const fecha = String(formData.get('fecha'));
    const items = JSON.parse(formData.get('items'));   //funcion items en el cliente, se trajo el array desde el form en forma de JSON
  
   console.log ( "datos:", "cliente_id:", cliente_id, "fecha:",fecha ,items, locals.token,BASE_URL)
   
   try {
     const res = await fetchApi.post({
      url: BASE_URL + "/pedidos",
      token: locals.token,
      body: {
         "cliente_id": cliente_id,
         "fecha":fecha, 
         "items": items                                  
            }
       ,resStatus: 200
        });

        if (res.status === 200) {
            const datos = await res.json(); 
              console.log(datos)        
            } else {
           //  return { success: false };
            }
          } catch (err) {
            console.log('Error: ', err);
            throw error(500, 'Algo salió mal al agregar el pedido');
          }  
          return { success: true, message: 'Pedido agregado correctamente!!!'}
         }

        }

    




















 
 
 
 
 
 
 
  
 




















































































