import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
    /* @migration task: add path argument */ cookies.delete('AuthorizationToken');
    /* @migration task: add path argument */ cookies.delete("Usuario")
    redirect(303, "/");
  }}