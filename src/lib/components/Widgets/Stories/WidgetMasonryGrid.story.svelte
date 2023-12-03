<script lang="ts">
	import { random } from 'lodash-es'
	import WidgetMasonryGrid from '../WidgetMasonryGrid.svelte'
	import { onMount } from 'svelte'
	import type { IMasonryItem } from '~/src/lib/utils/masonry-grid'
	import { v4 as uuidv4 } from 'uuid'

	const imageModules = import.meta.glob('../../../../tested-images/*.{jpg,png,jpeg,webp}')

	export let Hst: Hst

	const promises = Object.values(imageModules).map(v => v())
	const awaited = Promise.allSettled(promises)

	let images: Array<IMasonryItem & { src: string }> = []

	onMount(async () => {
		images = (await awaited).map((v) => v.value.default).slice(0, 120).map((src) => ({
			id: uuidv4(),
			width: random(100, 300),
			height: random(300, 100),
			src
		}))
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
						cols: 7,
						breakpoint: 1024
					}
				]}
				minCols={2}
				data={images}
				let:prop={{ item }}
			>
				<div>
					<img class="h-auto max-w-full rounded-lg" src={item.src} alt="Masonry item">
				</div>
			</WidgetMasonryGrid>
		{/if}
	</div>
</Hst.Story>
