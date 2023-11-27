import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import {fetchApi} from '$lib/fetchApi.js';

export const load = async ({ locals }) => {
	const getUsuario = async () => {
	  return  await fetchApi.get({url: BASE_URL + "/usuarios/perfil", token: locals.token, resStatus: 200})
	}
	const getClientes = async () => {
	  return await fetchApi.get({url: BASE_URL + "/clientes", token: locals.token, resStatus: 200})
	}
	  return {
		perfil: getUsuario(),
		clientes: getClientes()
	  } 
  }  

  export const actions={
	addClient: async ({request,locals,cookies})=>{
	  const formData=await request.formData();
	  const razon_social=formData.get('razon_social');
	  const cuit = formData.get('cuit');
	  const domicilio_calle = formData.get('domicilio_calle');
	  const domicilio_altura = formData.get('domicilio_altura');
	  const localidad = formData.get('localidad');
	  const codigo_postal = formData.get('codigo_postal'); 
	  const telefono = formData.get('telefono');
	  const email = formData.get('email');
	  console.log("cliente:",razon_social,cuit,domicilio_calle,domicilio_altura,localidad,
	    codigo_postal,telefono,email,locals.token,BASE_URL)

		try {
			const res = await fetchApi.post({
			  url: BASE_URL + "/clientes",
			  token: locals.token,
			  body: {
				"razon_social": razon_social,
				"cuit": parseInt(cuit),
				"domicilio_calle": domicilio_calle,
				"domicilio_altura": domicilio_altura,
				"localidad": localidad,
				"codigo_postal": codigo_postal,	
				"telefono": telefono,
				"email": email
			  }, resStatus: 200
			});
		  
			if (res.status === 200) {
			  const datos = await res.json();
			   cookies.set('Cliente', JSON.stringify({
			   razon_social: datos.razon_social,
			   cuit: datos.cuit,
			   domicilio_calle: datos.domicilio_calle,
               domicilio_altura: datos.domicilio_altura,
               localidad: datos.localidad,
               codigo_postal: datos.codigo_postal,	
               telefono: datos.telefono,		  
			 }), {
			     httpOnly: true,
			     path: '/',
			     secure: true,
			     sameSite: 'strict',
			     maxAge: 60 * 60 * 24 // 1 day
			  })		  
			} else {
			  //return { success: false };
			}
		  } catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Algo salió mal al agregar el cliente');
			//throw redirect(303, '/clientes')
		  }
		  return { success: true, message: 'Cliente agregado correctamente!!!'} 
	},
	
	deleteClient: async ({request,locals,cookies}) => {
	  const formData = await request.formData();
	  const id = formData.get('cliente_id');
	  console.log("cliente:",id,locals.token,BASE_URL)
	  
	  try {
		const res=await fetchApi.delete({
		  url: BASE_URL+`/clientes/${id}`,
		  token:locals.token, 
		  body:{
		  "id": id
		  }, 
		  resStatus: 200
		});

		if (res.status === 200) {
			const datos = await res.json();
			 cookies.set('ClienteEliminado', JSON.stringify({
			 id: datos.id
			 }), {
			  httpOnly: true,
			  path: '/',
			  secure: true,
			  sameSite: 'strict',
			  maxAge: 60 * 60 * 24 // 1 day  
			  })

			}else{
				//return { success: false };
			  }	
			}catch (err) {
				console.log('Error: ', err);
				throw error(500, 'Algo salió mal al eliminar el cliente');
		}
		return { success: true, message: 'Cliente eliminado correctamente!!!'}
	},
		
	editClient: async ({ request, locals, cookies }) => {
		const formData = await request.formData();
		const id = formData.get('cliente_id');
		const razon_social=formData.get('razon_social');
	    const cuit = formData.get('cuit');
	    const domicilio_calle = formData.get('domicilio_calle');
	    const domicilio_altura = formData.get('domicilio_altura');
	    const localidad = formData.get('localidad');
	    const codigo_postal = formData.get('codigo_postal'); 
	    const telefono = formData.get('telefono');
	    const email = formData.get('email');
	    console.log("cliente:",razon_social,cuit,domicilio_calle,domicilio_altura,localidad,
	                         codigo_postal,telefono,email,locals.token,BASE_URL)
		
		try {
		 const res = await fetchApi.patch({
			url: BASE_URL + `/clientes/${id}`,token: locals.token,
			body:{
				"id": id,
				"razon_social": razon_social,
				"cuit": parseInt(cuit),
				"domicilio_calle": domicilio_calle,
				"domicilio_altura": domicilio_altura,
				"localidad": localidad,
				"codigo_postal": codigo_postal,	
				"telefono": telefono,
				"email": email
				},resStatus: 200
					});
														
				if (res.status === 200) {
				 const datos = await res.json();							  				
				 cookies.set('ClienteActualizado', JSON.stringify({
					razon_social: datos.razon_social,
					cuit: datos.cuit,
					domicilio_calle: datos.domicilio_calle,
                    domicilio_altura: datos.domicilio_altura,
                    localidad: datos.localidad,
                    codigo_postal: datos.codigo_postal,	
                    telefono: datos.telefono,
                    email: datos.email
					}), {
						httpOnly: true,
						path: '/',
						secure: true,
						sameSite: 'strict',
						maxAge: 60 * 60 * 24 // 1 day
						})		  
					
					 } else {
						return { success: false };
					}
					} catch (err) {
					console.log('Error: ', err);
					throw error(500, 'Algo salió mal al actualizar el cliente');
				}	
				return { success: true, message: 'Cliente editado correctamente!!!'}					
			}
        };
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
						
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

   
  
  
 
 


