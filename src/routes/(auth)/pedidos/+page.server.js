import { BASE_URL } from '../../../lib/utils.js';
import { fetchApi } from '../../../lib/fetchApi.js';

export const load = async ({ locals }) => {
  
  const getProductos = async () => {
    return await fetchApi.get({ url: BASE_URL + "/productos", token: locals.token, resStatus: 200 });
  };

  const getClientes = async () => {
    return await fetchApi.get({ url: BASE_URL + "/clientes", token: locals.token, resStatus: 200 });
  };

  return {
    productos: getProductos(),
    clientes: getClientes(),
  };
};

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const date = formData.get('date');
    const date2 = formData.get('date2');
    const pedido_id = formData.get('pedido_id');
    const razon_social = formData.get('selectedRazonSocial');
    const producto = formData.get('selectedProducto');
    const cantidad = formData.get('cantidad');
    const precio = formData.get('precio');
    const subtotal = formData.get('subtotal');

    const pedido = { date, date2, pedido_id, razon_social, producto, cantidad, precio, subtotal };

    

    return pedido;
  }
};