import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';

export const load = async ({locals,params})=>{

const {pedido_cab_id} = params;

const getDetalle = async () => {
   const detalle = await fetchApi.get( {url: BASE_URL + `/pedidos/${pedido_cab_id}/detalle`,token:locals.token,resStatus:200});
   return detalle;
   }
   return {
		detalle: await getDetalle()	
	}
}