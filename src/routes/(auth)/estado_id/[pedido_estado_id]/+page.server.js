import { BASE_URL } from '../../../../lib/utils.js';
import { fetchApi } from '../../../../lib/fetchApi.js';
import { error } from '@sveltejs/kit';

export const load = async ( { locals, params,url }) => {
    const {pedido_estado_id } = params;   
    const estadoPedidoId = await fetchApi.get({url:BASE_URL+`/pedidos_estado/${pedido_estado_id}`,token:locals.token,resStatus:200});

     
    const getEstados = async ()=> {

      console.log('Estado pedidos server:', url.searchParams);
		const estadoId = url.searchParams.get('estado_id');
		let localUrl = '/pedidos';
		if (estadoId !== null) {
			localUrl += '?estado_id=' + estadoId;
		}
        return await fetchApi.get({url:BASE_URL+localUrl,token:locals.token,resStatus:200});
        }
     return { 
        estadoPedidoId,
        estados: getEstados()   
      }
      
   }
/*
   const getPedidos = async () => {
		console.log('Estado pedidos server:', url.searchParams);
		const estadoId = url.searchParams.get('estado_id');
		let localUrl = '/pedidos';
		if (estadoId !== null) {
			localUrl += '?estado_id=' + estadoId;
		}
		console.log('url:', localUrl);
		return await fetchApi.get({ url: BASE_URL + localUrl, token: locals.token, resStatus: 200 });
	};
*/
   export const actions = {
      confeccionado: async ({ request, locals }) => {
         const formData = await request.formData();
         const pedido_estado_id = formData.get("pedido_estado_id");
         const nombre = formData.get('nombre');
         const modificable = formData.get('modificable');
         const anulable = formData.get('anulable'); 
   
          console.log ( "estado:", pedido_estado_id , nombre, modificable, anulable, locals.token,BASE_URL)
   
         try {
            const res = await fetchApi.post({
               url: BASE_URL + '/pedidos',
               token: locals.token,
               body: {
                     pedido_estado_id: pedido_estado_id,
                     nombre:nombre,
                     modificable: modificable,
                     anulable: anulable           
               },
               resStatus: 200
            });
   
            if (res.status === 200) {
               const datos = await res.json();
               console.log(datos);
            } else {
               //  return { success: false };
            }
         } catch (err) {
            // console.log('Error: ', err);
            throw error(500, 'Algo salió mal al agregar el pedido');
         }
         return { success: true, message: 'Pedido agregado correctamente!!!' };
      }
   };
   

   
