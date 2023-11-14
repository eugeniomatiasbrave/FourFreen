<script>
	export let data

	export const {estados}=data;

	let estadoPedidoId;

console.log(estados)

</script>



<h3>Estado del pedido</h3>

<div>
	{#each estados as e }
		<li>
			<a href={`/estado/${e.pedido_estado_id}`}>{e.pedido_estado_id} {e.nombre}</a></li>
		
	{/each}
</div>



