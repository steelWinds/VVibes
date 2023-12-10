<script lang="ts">
	import type { Basic } from 'unsplash-js/dist/methods/collections/types'
	import UtilsSearchInput from '$lib/components/Utils/UtilsSearchInput.svelte'
	import IconLogo from '$lib/assets/icons/logo.svg?url'
	import { unsplash } from '~/src/lib/modules/unsplash'
	import { CheckCircleOutline } from 'flowbite-svelte-icons'

	let asyncOptions: Basic[] = []
	let selected: Basic[] | null = null
	let selectedIds: string[] = []
	let lastFilterText: string = ''

	$: selectedIds = selected?.map(({ id }) => id) ?? []

	const searchCollections = async (filterText: string): Promise<Basic[]> => {
		if (!filterText.length) return asyncOptions

		lastFilterText = ''

		const { response } = await unsplash.search.getCollections({
			query: filterText
		})

		lastFilterText = filterText

		asyncOptions = response?.results ?? []

		return asyncOptions
	}

	// eslint-disable-next-line @typescript-eslint/naming-convention
	const groupBy = ({ user, total_photos }: Basic): string => `
		${user.username} ${user.name ? `(${user.name})` : ''}, amount: ${total_photos}
	`
</script>

<div class="main-page bg-app-dark overflow-hidden">
	<svg viewBox="0 0 100 100" class="main-page__circle main-page__circle--1">
		<circle cx="50" cy="50" r="48" fill="transparent" />
	</svg>
	<svg viewBox="0 0 100 100" class="main-page__circle main-page__circle--2">
		<circle cx="50" cy="50" r="48" fill="transparent" />
	</svg>
	<svg viewBox="0 0 100 100" class="main-page__circle main-page__circle--3">
		<circle cx="50" cy="50" r="48" fill="transparent" />
	</svg>

	<article class="flex flex-col justify-center h-full w-full max-w-[900px] mx-auto z-20 relative overflow-auto py-4">
		<header class="w-full">
			<img class="max-w-[300px] ultrabook:max-w-[400px] laptop:max-w-[500px] mx-auto" src={IconLogo} alt="Main logo">
		</header>

		<form class="px-4">
			<UtilsSearchInput
				bind:value={selected}
				{groupBy}
				loadOptions={searchCollections}
				itemId="id"
				label="title"
				multiple={true}
				placeholder={lastFilterText || 'Search images'}
				debounceWait={500}
				clearFilterTextOnBlur={false}
				closeListOnChange={false}
			>
				<div slot="item" class="flex justify-between items-center" class:text-red={true} let:prop={{ item }}>
					<span>{ item.title }</span>

					{#if item.groupItem && selectedIds.includes(item.id)}
						<CheckCircleOutline class="w-4 text-primary-700" />
					{/if}
				</div>

				<div slot="selection" let:selection>
					<span>{selection.title}</span>
					<span>({selection.user.username})</span>
				</div>
			</UtilsSearchInput>
		</form>
	</article>
</div>

<style lang="postcss">
@keyframes spin {
	from {
		transform: translate(-50%, -50%) rotate(-360deg)
	}

	to {
		transform: translate(-50%, -50%) rotate(360deg);
	}
}

.main-page {
	position: relative;
	block-size: 100svh;

	@supports not (block-size: 100svh) {
		block-size: 100vh;
	}
}

.main-page__circle {
	position: fixed;
	inset: 50% auto auto 50%;
	transform: translate(-50%, -50%);
	stroke: white;
	stroke-width: 1.5Px;
	stroke-dashoffset: 3;
	animation: spin 0s linear infinite;
}

.main-page__circle--1 {
	inline-size: 35vw;
	stroke-dasharray: 10 3;
	animation-duration: 30s;
}

.main-page__circle--2 {
	inline-size: 55vw;
	stroke-dasharray: 15 3;
	animation-duration: 50s;
}

.main-page__circle--3 {
	inline-size: 75vw;
	stroke-dasharray: 20 3;
	animation-duration: 70s;
}
</style>
