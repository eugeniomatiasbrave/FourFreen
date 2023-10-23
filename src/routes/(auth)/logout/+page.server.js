import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
    cookies.delete('AuthorizationToken');
    cookies.delete("Usuario")
    throw redirect(303, "/")
  }}