<!-- Meow.story.svelte -->
<script lang="ts">
	import UtilsSwiper from '../UtilsSwiper.svelte'
	import { onMount } from 'svelte'

	const imageModules = import.meta.glob('../../../../tested-images/*.{jpg,png,jpeg,webp}')

	export let Hst: Hst

	const promises = Object.values(imageModules).map(v => v())
	const awaited = Promise.allSettled(promises)

	let images: string[] = []

	onMount(async () => {
		images = (await awaited).map((v) => v.value.default).slice(0, 10)
	})
</script>

<Hst.Story>
	{#if images.length > 0}
		<UtilsSwiper
			class="h-[400px] w-[300px]"
			data={images}
			effect="cards"
			loop
			let:prop={item}
		>
			<div class="h-full">
				<img class="w-full h-full object-cover" src={item} alt="Slider item">
			</div>
		</UtilsSwiper>
	{/if}
</Hst.Story>
