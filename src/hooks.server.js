import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	// console.log("hook:", event.route.id, event.route.id.includes("auth"))
	// console.log("hook:", event.url.pathname, event.url.pathname.includes("auth"))
	// verifico que tenga token y usuario generado en login
	const token = event.cookies.get('AuthorizationToken');
	const usuario = event.cookies.get('Usuario');
	console.log('cookies:', token, usuario);

	if (event.route.id && event.route.id.includes('auth')) {
		// es una ruta protegida
		if (!token || !usuario) {
			// Correctamente se añade el argumento 'path' al eliminar las cookies
			event.cookies.delete('AuthorizationToken', { path: '/' });
			event.cookies.delete('Usuario', { path: '/' });
			// Redirecciona al usuario a la página de inicio de sesión
			throw redirect(303, '/');
		}
	}
	// tiene las cookies, está autorizado, cargo los datos en locals
	if (token && usuario) {
		event.locals.token = token;
		event.locals.usuario = JSON.parse(usuario);
		console.log('ok hook:', event.locals);
	}

	// para ver el tiempo de carga
	const route = event.url.pathname;
	let start = performance.now();
	let end = performance.now();
	let responseTime = end - start;

	if (responseTime > 2000) {
		console.log(`SLOW 🐢: ${route} took ${responseTime}ms`);
	}

	if (responseTime < 2000) {
		console.log(`FAST 🚀 ruta: ${route} tiempo: ${responseTime}ms`);
	}

	const response = await resolve(event);
	return response;
};
