//import { error, redirect } from '@sveltejs/kit';
import { BASE_URL } from '../../../lib/utils.js';
import {fetchApi} from '../../../lib/fetchApi.js';

/* let pedidos=[{
	date: '07/07/2023',
	date2:'08/07/2023',
	pedido:6,
	razon_social:'La facultad sa.',
	producto:'Palta77',
	cantidad: 2,
	precio:300,
	subtotal:600,
    }
];
*/



export const load = async ({ locals }) => {
	const getProductos = async () => {
		return await fetchApi.get({url: BASE_URL + "/productos", token: locals.token, resStatus: 200})
	  }
	 
	const getClientes = async () => {
	  return await fetchApi.get({url: BASE_URL + "/clientes", token: locals.token, resStatus: 200})
	}
	  return {
		productos: getProductos(),
		clientes: getClientes(),
		//pedidos
	  } 
  }  

 
  export const actions= {
	default: async ({ request}) => {
	  const formData = await request.formData();
	  const date = formData.get('date');
	  const date2 = formData.get('date2');
	  const pedido_id = formData.get('pedido_id');
	  const razon_social = formData.get('selectedRazonSocial');
	  const producto = formData.get('selectedProducto');
	  const cantidad = formData.get('cantidad');
	  const precio = formData.get('precio');
	  const subtotal = formData.get('subtotal');
	  
     console.log( date, date2, pedido_id, razon_social, producto, cantidad, precio, subtotal)

	}
}


