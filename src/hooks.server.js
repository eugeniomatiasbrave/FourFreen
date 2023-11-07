import { redirect } from '@sveltejs/kit';

export const handle = async ({event, resolve}) => {
  // console.log("hook:", event.route.id, event.route.id.includes("auth"))
  // console.log("hook:", event.url.pathname, event.url.pathname.includes("auth"))
  // verifico que tenga token y usuario generado en login
  const token = event.cookies.get('AuthorizationToken');
  const usuario = event.cookies.get("Usuario")
  console.log("cookies:", token, usuario)
  
  if (event.route.id && event.route.id.includes("auth")) {
    // es una ruta protegida
    if (!token || !usuario) {
      console.log("Faltan datos:", token, usuario)
      event.cookies.delete('AuthorizationToken');
      event.cookies.delete("Usuario")
      throw redirect(303, "/login")
    } 
  }
  // tiene las cookies, está autorizado, cargo los datos en locals
  if (token && usuario) {
  event.locals.token = token
  event.locals.usuario = JSON.parse(usuario)
  console.log("ok hook:", event.locals)
  }
  return resolve(event)
}