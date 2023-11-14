
import { BASE_URL } from '../../../lib/utils.js';
import {fetchApi} from '../../../lib/fetchApi.js';

export const load = async ({ locals }) => {
  const getEstados = async () => {
    return await fetchApi.get({url: BASE_URL + "/pedidos_estado", token: locals.token, resStatus: 200})
  }
  return {
    estados: getEstados(),
  }
}  