<script>
	import { P , Img} from 'flowbite-svelte';
	import LogoFG0 from '$lib/img/LogoFG0.png';
	import './style.css';

</script>

<svelte:head>
	<title>Inicio</title>
	<meta name="description" content="Showcase" />
</svelte:head>

<main class="inicio">
<div class="flex items-center justify-center h-screen">
    <Img src={LogoFG0}  alt="sample 1"/>
</div>

</main>

<style>
	.inicio {
		display: flex;
		flex-direction: column;
		max-height: 82vh;
	}
</style>