import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';

export async function load({ params,locals}) {

  const {cliente_id} = params
  const getCliente =  async () => {
	const cliente = await fetchApi.get({ url: BASE_URL + `/clientes/${cliente_id}`, token: locals.token, resStatus: 200});
		return cliente
	    }
		return {  
		  cliente:await getCliente()
  };
}