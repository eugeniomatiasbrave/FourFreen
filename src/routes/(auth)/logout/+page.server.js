import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		// Especifica el 'path' al eliminar las cookies
		cookies.delete('AuthorizationToken', { path: '/' });
		cookies.delete('Usuario', { path: '/' });
		// Devuelve la función 'redirect' para manejar la redirección
		throw redirect(303, '/');
	}
};
