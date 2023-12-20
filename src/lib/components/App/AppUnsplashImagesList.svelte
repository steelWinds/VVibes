<script lang="ts">
	import type { Basic } from 'unsplash-js/dist/methods/photos/types'
	import type { IMasonryItem } from '~/src/lib/utils/masonry-grid'
	import WidgetMasonryGrid from '$lib/components/Widgets/WidgetMasonryGrid.svelte'
	import UISelectable from '$lib/components/UI/UISelectable.svelte'
	import UIIconCard from '$lib/components/UI/UIIconCard.svelte'
	import InfiniteScroll from 'svelte-infinite-scroll'
	import { Badge, Spinner } from 'flowbite-svelte'
	import { ShareNodesOutline, DropboxSolid } from 'flowbite-svelte-icons'
	import { unsplash } from '~/src/lib/modules/unsplash'
	import { useLazyImage } from '$lib/actions/use-lazy-image'
	import { useImageSkeleton } from '../../actions/use-image-skeleton'
	import { onMount } from 'svelte'
	import { isNil } from 'lodash-es'

	type ImageSize = keyof Basic['urls']

	export let query: string = ''
	export let perPage: number = 100
	export let size: ImageSize = 'regular'
	export let selected = new Map<string, Basic>()

	let page = 1
	let images: Array<Basic & IMasonryItem> = []
	let totalResults: number | null = null

	$: isEnd = !isNil(totalResults) && images.length >= totalResults
	$: isEmpty = isEnd && !images.length

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
		}
	}

	const onPostRender = (): void => {
		if ((document.documentElement.scrollHeight <= document.documentElement.clientHeight) && !isEnd) {
			void fetchImages()
		}
	}

	const toggleSelected = (image: Basic): void => {
		selected.has(image.id) ? selected.delete(image.id) : selected.set(image.id, image)

		selected = selected
	}

	onMount(() => fetchImages())
</script>

<div>
	<div class="p-3">
		{#if isEmpty}
			<UIIconCard icon={DropboxSolid} title='Oh, is empty!' />
		{/if}

		{#if !isEmpty}
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
									use:useLazyImage={{ src: item.urls[size] }}
									class="h-auto w-full transition-opacity duration-150"
									alt={item.alt_description}
								>
						</div>

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
					</UISelectable>
				</div>
			</WidgetMasonryGrid>
		{/if}

		{#if !isEnd}
			<div class="py-5 flex justify-center">
				<Spinner />
			</div>
		{/if}
	</div>

	<InfiniteScroll threshold={300} window on:loadMore={fetchImages} />
</div>
