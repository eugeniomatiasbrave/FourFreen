<script>
import {goto} from '$app/navigation';
import {Button,P,Table,TableBody,TableBodyCell,TableBodyRow,TableHead,TableHeadCell} from 'flowbite-svelte';
export let data
	
const detalle= data.detalle.datos
console.log(detalle)
	  
</script>
	
<main class="bg-gray-50 dark:bg-gray-900 sm:p-3">
  <div class="my-4">
	<P size="2xl" align="center">Detalle del Pedido</P>
  </div>	
 <div class=" bg-white mx-auto p-1 pt-1 rounded border border-gray-200 shadow-md w-2/3">
	<div class="overflow-x-auto"> 
		<Table hoverable={true} class="mx-auto mt-1 border text-xs" > 		
		<TableHead class=" bg-primary-500 text-white" style="text-align: center;"> 
			<TableHeadCell class="py-2">ID del pedido</TableHeadCell>
			<TableHeadCell class="py-2">ID del producto</TableHeadCell> 
		    <TableHeadCell class="py-2">Nombre del producto</TableHeadCell>
		    <TableHeadCell class="py-2">Unidades</TableHeadCell>
		    <TableHeadCell class="py-2" style="text-align: right;">Precio</TableHeadCell>
			<TableHeadCell class="py-2" style="text-align: right;">Importe Total</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each detalle as det} 
			<TableBodyRow class=" hover:bg-hover-gray-light" style="text-align: center;">
			<TableBodyCell class="py-2">{det.pedido_cab_id}</TableBodyCell>
			<TableBodyCell class="py-2">{det.producto_id}</TableBodyCell>
			<TableBodyCell class="py-2">{det.producto_nombre}</TableBodyCell>
			<TableBodyCell class="py-2">{det.unidades}</TableBodyCell>
			<TableBodyCell class="py-2" style="text-align: right;">${det.precio.toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})}</TableBodyCell>
			<TableBodyCell class="py-2" style="text-align: right;">${det.importe.toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})}</TableBodyCell>
		</TableBodyRow>
		{/each}	
		</TableBody>
	  </Table>
	  <Button on:click={() => goto('/pedidos')} class="bg-primary-500 h-8 mb-2 md:mb-0 md:ml-2 rounded my-3">Volver</Button>
	</div>
 </div>
</main>	