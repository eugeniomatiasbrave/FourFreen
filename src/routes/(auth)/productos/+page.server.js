import { error } from '@sveltejs/kit';
import {BASE_URL} from '$lib/utils.js';
import {fetchApi} from '$lib/fetchApi.js';

export const load=async({locals,url})=>{
  
const search=url.searchParams.get('search');
const sort=url.searchParams.get('sort');
const datos=url.searchParams.get('datos'); //datos: precio, nombre, producto_id

const getProductos = async () => {
    try {
      return await fetchApi.get({ url: BASE_URL + '/productos', token: locals.token, resStatus: 200 });  
      } catch (err) {
       console.log('Error: ', err);
       throw error(500, 'Algo salio mal con la peticion de los productos', err);
      }     
    }
 
const getProductosSearch=async()=>{
    try {
      return await fetchApi.get({url:BASE_URL+'/productos?search=',token:locals.token,resStatus:200}) 
      } catch (err) {
        console.log('Error: ', err);
      throw error(500, 'Algo salio mal alfiltrar por nombre de producto' , err);
     }     
   }

const getSSP=async()=>{
 
    try {
      return await fetchApi.get({url:BASE_URL+`/productos?search=${search}&sort=precio:${sort}`,token:locals.token,resStatus:200}) 
      } catch (err) {
        console.log('Error: ', err);
      throw error(500, 'Algo salio mal al ordenar por nombre y precio', err);
     }     
   }

const getSort=async()=>{
    try {
      return await fetchApi.get({url:BASE_URL+`/productos?sort=${datos}:${sort}`,token:locals.token,resStatus:200});
      } catch (err) {
        console.log('Error: ', err);
      throw error(500, 'Algo salio mal al ordenar los productos', err);
     }     
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








