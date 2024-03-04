<script>
	import { Img,P } from 'flowbite-svelte';
	import FG03 from '$lib/img/FG03.png';
	import './style.css';
</script>

<svelte:head>
	<title>FourGreens-Inicio</title>
	<meta name="description" content="Inicio" />
</svelte:head>


<main class="inicio">
	<div class="flex items-center justify-center h-screen">
		<Img src={FG03} class="w-36" alt="sample 1" />
	</div>
</main>


<style>
	.inicio {
		display: flex;
		flex-direction: column;
		max-height: 82vh;
	}

	
	
	
</style>
