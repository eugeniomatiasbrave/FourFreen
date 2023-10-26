
import { BASE_URL } from '../../../lib/utils.js';
import {fetchApi} from '../../../lib/fetchApi.js';

export const load = async ({ locals }) => {
	const getUsuario = async () => {
	  return  await fetchApi.get({url: BASE_URL + "/usuarios/perfil", token: locals.token, resStatus: 200})
	}
	return {
	  perfil: getUsuario(),
	}
  
  }  


 
 

 
