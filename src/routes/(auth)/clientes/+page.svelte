<script>
export let data;
export const { perfil} = data;

</script>

<h1>Clientes</h1>
<div>
	<p>{perfil.usuario_id}</p>
	<p>{perfil.nombre}</p>
	<p>{perfil.email}</p>
	<p>{perfil.creado}</p>
</div>

