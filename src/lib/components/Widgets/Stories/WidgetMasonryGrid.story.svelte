<script lang="ts">
	import WidgetMasonryGrid from '../WidgetMasonryGrid.svelte'
	import { onMount } from 'svelte'

	const imageModules = import.meta.glob('../../../../tested-images/*.{jpg,png,jpeg,webp}')

	export let Hst: Hst

	const promises = Object.values(imageModules).map(v => v())
	const awaited = Promise.allSettled(promises)

	let images: string[] = []

	onMount(async () => {
		images = (await awaited).map((v) => v.value.default).slice(0, 1000)
	})
</script>

<Hst.Story>
	<div class="p-2 mb-6">
		{#if images.length > 0}
			<WidgetMasonryGrid
				colsSettings={[
					{
						cols: 2,
						breakpoint: 375
					},
					{
						cols: 4,
						breakpoint: 768
					},
					{
						cols: 10,
						breakpoint: 1024
					}
				]}
				minCols={2}
				data={images}
				let:prop={{ item }}
			>
				<div>
					<img class="h-auto max-w-full rounded-lg" src={item} alt="jopa">
				</div>
			</WidgetMasonryGrid>
		{/if}
	</div>
</Hst.Story>
