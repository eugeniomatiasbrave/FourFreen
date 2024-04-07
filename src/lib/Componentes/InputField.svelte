<script>
	import { Input, Label } from 'flowbite-svelte';
	export let type = 'text';
	export let name;
	export let value = '';
	export let placeholder = '';
	export let maxlength = undefined;
	export let onValidate = () => {};
</script>

<Label class="space my-1 text-gray-700">
	<span>{placeholder}</span>
	<Input
		{type}
		{name}
		{value}
		{maxlength}
		required
		{placeholder}
		class="  px-4 py-2 w-full h-8 rounded-lg border mt-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
		on:change={onValidate}
	/>
</Label>

<style>
</style>
