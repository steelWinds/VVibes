<script lang="ts">
	import { onMount } from 'svelte'
	import WidgetImagesSlider from '../WidgetImagesSlider.svelte'

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
		<WidgetImagesSlider {images} />
	{/if}
</Hst.Story>
