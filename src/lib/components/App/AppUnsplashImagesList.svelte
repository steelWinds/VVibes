<script lang="ts">
	import type { Basic } from 'unsplash-js/dist/methods/photos/types'
	import type { IMasonryItem } from '$lib/utils/masonry-grid'
	import WidgetMasonryGrid from '$lib/components/Widgets/WidgetMasonryGrid.svelte'
	import UIModalCard from '$lib/components/UI/UIModalCard.svelte'
	import UIIconCard from '$lib/components/UI/UIIconCard.svelte'
	import WidgetMedianCut from '$lib/components/Widgets/WidgetMedianCut.svelte'
	import InfiniteScroll from 'svelte-infinite-scroll'
	import { Badge, Spinner } from 'flowbite-svelte'
	import { ShareNodesOutline, BugOutline, InboxSolid } from 'flowbite-svelte-icons'
	import { unsplash } from '$lib/modules/unsplash'
	import { useLazyImage } from '$lib/actions/use-lazy-image'
	import { useImageSkeleton } from '$lib/actions/use-image-skeleton'
	import { isNil } from 'lodash-es'

	type ImageSize = keyof Basic['urls']

	export let query: string = ''
	export let perPage: number = 100
	export let size: ImageSize = 'regular'
	export let hasImages: boolean = false

	let page = 1
	let images: Array<Basic & IMasonryItem> = []
	let totalResults: number | null = null

	$: isEnd = !isNil(totalResults) && images.length >= totalResults

	const fetchImages = async (): Promise<void> => {
		if (totalResults && images.length >= totalResults) return

		try {
			const { response } = await unsplash.search.getPhotos({
				query,
				perPage,
				page
			})

			page += 1
			totalResults = response?.total ?? Number.MAX_VALUE

			images = [...images, ...(response?.results ?? [])]
		} finally {
			images = images

			hasImages = Boolean(images.length)
		}
	}

	const onPostRender = (): void => {
		if ((document.documentElement.scrollHeight <= document.documentElement.clientHeight) && !isEnd) {
			void fetchImages()
		}
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
					let:prop={{ item }}
					on:postRender={onPostRender}
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
							<div slot="modal" class="grid grid-cols-1 tablet:grid-cols-2 gap-6">
								<img
									src={item.urls[size]}
									class="w-full h-[200px] tablet:h-[300px] object-cover rounded-lg"
									alt={item.alt_description}
								>

								<div class="rounded-lg overflow-hidden grid min-h-[300px]">
									<WidgetMedianCut src={item.urls[size]} depth={1} maxDepth={3} blockSize={300} inlineSize={300} />
								</div>
							</div>

							<div class="overflow-hidden relative">
								<img
									use:useLazyImage={{ src: item.urls[size] }}
									class="h-auto w-full transition-opacity duration-150"
									alt={item.alt_description}
								>

								<Badge
									class="text-12 z-20 desktop:text-16 absolute top-2 left-2"
									href={item.user.portfolio_url}
									target="_blank"
									rounded
									color="dark"
								>
									<ShareNodesOutline class="h-3 mr-1" />

									<span class="max-w-[60px] desktop:max-w-[120px] truncate">
										{ item.user.name }
									</span>
								</Badge>
							</div>
						</UIModalCard>
					</div>
				</WidgetMasonryGrid>

				<Spinner class="justify-self-center self-center my-2" />
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
