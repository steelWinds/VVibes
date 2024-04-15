<script lang="ts">
	import type { Basic } from 'unsplash-js/dist/methods/photos/types'
	import type { IMasonryItem } from '$lib/utils/masonry-grid'
	import WidgetMasonryGrid from '$lib/components/Widgets/WidgetMasonryGrid.svelte'
	import UIModalCard from '$lib/components/UI/UIModalCard.svelte'
	import UIIconCard from '$lib/components/UI/UIIconCard.svelte'
	import WidgetMedianCut from '$lib/components/Widgets/WidgetMedianCut.svelte'
	import InfiniteScroll from 'svelte-infinite-scroll'
	import { Spinner } from 'flowbite-svelte'
	import { BugOutline, InboxSolid } from 'flowbite-svelte-icons'
	import { unsplash } from '$lib/modules/unsplash'
	import { useLazyImage } from '$lib/actions/use-lazy-image'
	import { useImageSkeleton } from '$lib/actions/use-image-skeleton'

	type ImageSize = keyof Basic['urls']

	export let query: string = ''
	export let perPage: number = 100
	export let size: ImageSize = 'regular'
	export let hasImages: boolean = false

	let page = 1
	let images: Array<Basic & IMasonryItem> = []
	let totalResults: number = 0
	let masonryGridRef = null

	$: isEnd = images.length >= totalResults

	const fetchImages = async (): Promise<void> => {
		if (totalResults && images.length >= totalResults) return

		page++

		try {
			const { response } = await unsplash.search.getPhotos({
				query,
				perPage,
				page
			})

			totalResults = response?.total ?? 0

			images = [...images, ...(response?.results ?? [])]
		} finally {
			images = images

			hasImages = Boolean(images.length)
		}
	}

	const onPostRender = (height: number): void => {
		if ((document.documentElement.clientHeight > height) && !isEnd) void fetchImages()
	}
</script>

<div>
	<div class="grid">
		{#await fetchImages()}
			<Spinner class="justify-self-center self-center" />
		{:then}
			{#if images.length}
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
					bind:this={masonryGridRef}
					let:prop={{ item }}
					on:postRender={(e) => { onPostRender(e?.detail) }}
				>
					<div
						use:useImageSkeleton={{
							color: item.color ?? 'gray',
							inlineSize: item.width,
							blockSize: item.height
						}}
						class="rounded-lg overflow-hidden"
					>
						<UIModalCard modalTitle={`${item.user.name} | ${item.alt_description}`}>
							<div slot="modal" class="grid grid-cols-1 gap-6">
								<img
									src={item.urls[size]}
									class="w-auto max-h-[300px] object-cover rounded-lg mx-auto"
									alt={item.alt_description}
								>

								<div class="rounded-lg overflow-hidden grid min-h-[300px]">
									<WidgetMedianCut src={item.urls[size]} depth={0} maxDepth={2} blockSize={300} inlineSize={300} />
								</div>
							</div>

							<div class="overflow-hidden relative">
								<img
									use:useLazyImage={{ src: item.urls[size] }}
									class="h-auto w-full transition-opacity duration-150"
									alt={item.alt_description}
								>
							</div>
						</UIModalCard>
					</div>
				</WidgetMasonryGrid>

				{#if !isEnd}
					<Spinner class="justify-self-center self-center my-2" />
				{/if}
			{/if}

			{#if !images.length}
				<div class="justify-self-center self-center">
					<UIIconCard icon={InboxSolid} title="Empty!" />
				</div>
			{/if}
		{:catch error}
			<div class="justify-self-center self-center">
				<UIIconCard icon={BugOutline} title={error.message} />
			</div>
		{/await}
	</div>

	<InfiniteScroll threshold={300} window on:loadMore={fetchImages} />
</div>
