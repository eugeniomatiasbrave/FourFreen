import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';


export const load = async ({ locals, url}) => {
  const search = url.searchParams.get('search');
  const sort = url.searchParams.get('sort');

  
 
  const getProductos = async () => {
    try {
      const productos = await fetchApi.get({ url: BASE_URL + '/productos', token: locals.token, resStatus: 200 });
      return productos;
    } catch (err) {
      console.error('Error original: ', err);
      throw error(500, 'Algo salio mal con la peticion de los productos', err);
    }
  };
  
  const getProductosSearch=async()=>{
      try {
        const productosSearch = await fetchApi.get({url:BASE_URL+'/productos?search=',token:locals.token,resStatus:200}) 
        return productosSearch;
      } catch (err) {
          console.error('Error: ', err);
        throw error(500, 'Algo salio mal al filtrar por nombre de producto' , err);
       }     
     }
  
  const getSortPrecio=async()=>{
      try {
        const sortPrecio = await fetchApi.get({url:BASE_URL+`/productos?sort=${search}:${sort}`,token:locals.token,resStatus:200});
        return sortPrecio;
      } catch (err) {
          console.error('Error: ', err);
        throw error(500, 'Algo salio mal al ordenar los productos', err);
       }     
     }
  
     const getSortNombre=async()=>{
      try {
        const sortNombre = await fetchApi.get({url:BASE_URL+`/productos?sort=${search}:${sort}`,token:locals.token,resStatus:200});
         return sortNombre;  
      } catch (err) {
          console.error('Error: ', err);
        throw error(500, 'Algo salio mal al ordenar los productos', err);
       }     
     }
  
     const getSortProducto_id=async()=>{
      try {
        const sortProducto_id = await fetchApi.get({url:BASE_URL+`/productos?sort=${search}:${sort}`,token:locals.token,resStatus:200});
         return sortProducto_id;  
      } catch (err) {
          console.error('Error: ', err);
        throw error(500, 'Algo salio mal al ordenar los productos', err);
       }     
     }
  
      return {
        productos: await getProductos(),
        productosSearch: await getProductosSearch(),
        sortPrecio: await getSortPrecio(),
        sortNombre: await getSortNombre(),
        sortProducto_id: await getSortProducto_id()
       
    
      }
    }  



















