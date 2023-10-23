export const load = ({ locals }) => {
    console.log("locals:", locals)
		return {
      usuario: locals.usuario
		};

};