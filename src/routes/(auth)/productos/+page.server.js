import {BASE_URL} from '$lib/utils.js';
import {fetchApi} from '$lib/fetchApi.js';


export const load=async({locals,url})=>{
  
  const search=url.searchParams.get('search');
  const sort=url.searchParams.get('sort');
  const datos=url.searchParams.get('datos'); //datos: precio, nombre, producto_id

  const getProductos=async()=>{
    return await fetchApi.get({url:BASE_URL+'/productos',token:locals.token,resStatus:200})
    }

  const getProductosSearch=async()=>{
    return await fetchApi.get({url:BASE_URL+'/productos?search=',token:locals.token,resStatus:200})
    }

  const getSSP=async()=>{
    return await fetchApi.get({url:BASE_URL+`/productos?search=${search}&sort=precio:${sort}`,token:locals.token,resStatus:200})
    }

  const getSort=async()=>{
    return await fetchApi.get({url:BASE_URL+`/productos?sort=${datos}:${sort}`,token:locals.token,resStatus:200});
    }

    return {
      productos: getProductos(),
      productosSearch: getProductosSearch(),
      searchSortPrecio: getSSP(),
      sortPrecio: getSort('precio'),
      sortNombre:getSort('nombre'),
      sortProducto_id:getSort('producto_id')
      
    }
  }  








