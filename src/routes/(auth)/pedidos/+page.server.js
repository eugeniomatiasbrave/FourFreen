import { BASE_URL } from '../../../lib/utils.js';
import { fetchApi } from '../../../lib/fetchApi.js';
import { error } from '@sveltejs/kit';

 

export const load = async ({ locals }) => {
   const getPedidos = async () => {
      return await fetchApi.get({ url: BASE_URL + "/pedidos", token: locals.token, resStatus: 200 }); };
   const getProductos = async () => {
      return await fetchApi.get({ url: BASE_URL + "/productos", token: locals.token, resStatus: 200 }); };
   const getClientes = async () => {
      return await fetchApi.get({ url: BASE_URL + "/clientes", token: locals.token, resStatus: 200 }); };
      return { pedidos: getPedidos(), productos: getProductos(),clientes: getClientes()

       
      };
      
    
    };



export const actions = {
  addPedido: async ({ request, locals }) => {
    const formData = await request.formData();
    const cliente_id = Number(formData.get('cliente_id'));
    const fecha = String(formData.get('fecha'));
    const items = JSON.parse(formData.get('items'));
    
  
  
  
  /*
    const producto_id= Number(formData.get('producto_id'));
    const unidades= Number(formData.get('unidades'));
    const precio= Number(formData.get('precio'))


{ "producto_id": items.producto_id,
  "unidades":items.unidades,
    "precio":items.precio 
        }]                   

     */
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
         }
        }

    




















 
 
 
 
 
 
 
  
 




















































































