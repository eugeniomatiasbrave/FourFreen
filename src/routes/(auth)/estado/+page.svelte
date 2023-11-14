<script>
	export let data

	export const {estados}=data;

	let estadoPedidoId;

console.log(estados)

</script>



<h3>Estado del pedido</h3>

<div>
	{#each estados as e }
		<ul>
			<a href={`/pedido_estado_id/${e.pedido_estado_id}`}>{e.pedido_estado_id} {e.nombre}</a>
		</ul>
	{/each}
</div>



