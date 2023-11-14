

import { BASE_URL } from '../../../../lib/utils.js';
import { fetchApi } from '../../../../lib/fetchApi.js';

export const load = async ( { locals, params }) => {

const {pedido_estado_id} = params;

     

const estadoPedidoId = await fetchApi.get( {url: BASE_URL + `/pedidos_estado/${pedido_estado_id}`, token: locals.token, resStatus: 200 });


     console.log(estadoPedidoId);
     
     return {
       
        estadoPedidoId
        
      };
      
   }
   
   

  