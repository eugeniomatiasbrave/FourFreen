import { fetchApi } from '$lib/fetchApi';
import { BASE_URL } from '$lib/utils.js';
export const load = async ({ locals }) => { 
  const getMenu = async () => {
    const datos = await fetchApi.get({
      url: BASE_URL + "/usuarios/menu",
      token: locals.token,
      resStatus: 200
    });
    return datos.menu;
  };
  if (locals.token && locals.usuario) {
    const menu = await getMenu();
    
    return {
      usuario: locals.usuario,
      menu: menu
    };
  } else {
    return {};
  }
};
