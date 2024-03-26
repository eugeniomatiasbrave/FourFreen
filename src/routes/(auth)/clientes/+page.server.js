import { error } from '@sveltejs/kit';
import { BASE_URL } from '$lib/utils.js';
import { fetchApi } from '$lib/fetchApi.js';

export const load = async ({ locals, url }) => {
	const sort = url.searchParams.get('sort');

	const getClientes = async () => {
		try {
			const clientes = await fetchApi.get({url: BASE_URL + '/clientes',token: locals.token,resStatus: 200});
			return clientes;
		} catch (err) {
			console.error('Error: ', err);
			error(500, 'Algo salio mal con la peticion de los clientes', err);
		}
	};

	const getClientesSearch = async () => {
		try {
			const searchclientes = await fetchApi.get({url: BASE_URL + '/clientes?search=',token: locals.token,resStatus: 200});
			return searchclientes;
		} catch (err) {
			console.error('Error: ', err);
			error(500, 'Algo salio mal al filtrar por nombre de cliente', err);
		}
	};

	const getSortRS = async () => {
		try {
			const sortrazonsocial = await fetchApi.get({url: BASE_URL + `/clientes?sort=razon_social:${sort}`,token: locals.token,resStatus: 200});
			return sortrazonsocial;
		} catch (err) {
			console.error('Error: ', err);
			error(500, 'Algo salio mal al ordenar los clientes', err);
		}
	};

	const getSortCliente_id=async()=>{
		try {
		  const sortCliente_id = await fetchApi.get({url:BASE_URL+`/clientes?sort=cliente_id:${sort}`,token:locals.token,resStatus:200});
		   return sortCliente_id;  
		} catch (err) {
			console.error('Error: ', err);
		  error(500, 'Algo salio mal al ordenar los productos', err);
		 }     
	   }

	return {
		clientes: await getClientes(),
		sortrazonsocial: await getSortRS(),
		searchclientes: await getClientesSearch(),
		sortCliente_id: await getSortCliente_id()
	};
};

export const actions = {
	
	deleteClient: async ({ request, locals, cookies }) => {
		const formData = await request.formData();
		const id = formData.get('cliente_id');
		console.log('cliente:', id, locals.token, BASE_URL);

		try {
			const res = await fetchApi.delete({
				url: BASE_URL + `/clientes/${id}`,
				token: locals.token,
				body: {
					id: id
				},
				resStatus: 200
			});

			if (res.status === 200) {
				const datos = await res.json();
				cookies.set(
					'ClienteEliminado',
					JSON.stringify({
						id: datos.id
					}),
					{
						httpOnly: true,
						path: '/',
						secure: true,
						sameSite: 'strict',
						maxAge: 60 * 60 * 24 // 1 day
					}
				);
			} else {
				//return { success: false };
			}
		} catch (err) {
			console.log('Error: ', err);
			error(500, 'Algo salió mal al eliminar el cliente');
		}
		return { success: true, message: 'Cliente eliminado correctamente!!!' };
	}


};
