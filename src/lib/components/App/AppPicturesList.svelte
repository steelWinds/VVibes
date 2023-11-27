<script lang="ts">
	import type { PhotosWithTotalResults, Photo } from 'pexels'
	import WidgetMasonryGrid from '$lib/components/Widgets/WidgetMasonryGrid.svelte'
	import { Button, Badge } from 'flowbite-svelte'
	import { pexels } from '$lib/modules/pexels'
	import { useClickOutside } from '$lib/actions/use-image-skeleton'
	import { useLazyImage } from '$lib/actions/use-lazy-image'

	export let query: string = 'random'
	export let perPage: number = 50
	export let size: string = 'small'

	let page = 1
	let images: Photo[] = []
	let totalResults: number = 0

	const fetchImages = async (): Promise<void> => {
		try {
			const response = await pexels.photos.search({
				query,
				per_page: perPage,
				size,
				page
			}) as PhotosWithTotalResults

			page = response.page + 1
			totalResults = response.total_results

			images = [...images, ...response.photos]
		} finally {
			images = images
		}
	}

	$: if (totalResults && images.length >= totalResults) {
		console.log('end')
	}
</script>

<div>
	<div class="p-2 mb-6">
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
			<div
				use:useClickOutside={{
					color: item.avg_color ?? 'black',
					originalHeight: item.height,
					originalWidth: item.width
				}}
				class="rounded-lg overflow-hidden relative"
			>
				<img
					use:useLazyImage={{ src: item.src.medium }}
					class="h-auto w-full transition-opacity duration-150"
					alt={item.alt}
				>

				<Badge class="absolute top-2 left-2" href={item.photographer_url} target="_blank" rounded>
					{ item.photographer }
				</Badge>
			</div>
		</WidgetMasonryGrid>
	</div>

	<Button class="w-full mb-6" on:click={fetchImages}>
		Download more
	</Button>
</div>
