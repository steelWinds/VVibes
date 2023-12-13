<script lang="ts">
	import { P } from 'flowbite-svelte'

	export let icon: ConstructorOfATypedSvelteComponent
	export let title: string
</script>

<div class="grid justify-center">
	<div class="w-24 h-24 mb-4 text-primary-700 mx-auto">
		<svelte:component this={icon} class="w-full h-full" />
	</div>

	<P weight="medium" color="text-primary-700" class="text-center">
		{ title }
	</P>
</div>
