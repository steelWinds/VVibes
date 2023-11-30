<script lang="ts">
	import type { PhotosWithTotalResults, Photo } from 'pexels'
	import WidgetMasonryGrid from '$lib/components/Widgets/WidgetMasonryGrid.svelte'
	import UISelectable from '$lib/components/UI/UISelectable.svelte'
	import { Button, Badge } from 'flowbite-svelte'
	import { pexels } from '$lib/modules/pexels'
	import { useClickOutside } from '$lib/actions/use-image-skeleton'
	import { useLazyImage } from '$lib/actions/use-lazy-image'
	import { ShareNodesOutline } from 'flowbite-svelte-icons'
	import { createMasonryGrid } from '$lib/utils/masonry-grid/internal/index'

	export let query: string = 'masonry'
	export let perPage: number = 70
	export let size: string = 'small'
	export let selected = new Map<number, Photo>()

	let page = 1
	let images: Photo[] = []
	let totalResults: number = 0

	const fetchImages = async (): Promise<void> => {
		if (totalResults && images.length >= totalResults) return

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

			createMasonryGrid({ columnCount: 7, columnSize: 200, items: images })
		} finally {
			images = images
		}
	}

	const toggleSelected = (image: Photo): void => {
		selected.has(image.id) ? selected.delete(image.id) : selected.set(image.id, image)

		selected = selected
	}

	// TODO: work
	// $: if (totalResults && images.length >= totalResults) {
	// 	console.log('end')
	// }

	// $: {
	// 	console.log(selected)
	// }
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
					cols: 3,
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
				class="rounded-lg overflow-hidden"
			>
				<UISelectable
					class="w-full h-full"
					overlayClass="z-10"
					active={selected.has(item.id)}
					on:toggle={() => { toggleSelected(item) }}
				>
					<div
						class="overflow-hidden relative"
					>
							<img
								use:useLazyImage={{ src: item.src.medium }}
								class="h-auto w-full transition-opacity duration-150"
								alt={item.alt}
							>
					</div>

					<Badge
						class="text-12 z-20 desktop:text-16 absolute top-2 left-2"
						href={item.photographer_url}
						target="_blank"
						rounded
						color="dark"
					>
						<ShareNodesOutline class="h-3 mr-1" />

						<span class="max-w-[60px] desktop:max-w-[120px] truncate">
							{ item.photographer }
						</span>
					</Badge>
				</UISelectable>
			</div>
		</WidgetMasonryGrid>
	</div>

	<Button class="w-full mb-6" on:click={fetchImages}>
		Download more
	</Button>
</div>
