<script lang="ts">
	import type { Basic } from 'unsplash-js/dist/methods/collections/types'
	import UtilsSearchInput, { type IList } from '../UtilsSearchInput.svelte'
	import { unsplash } from '~/src/lib/modules/unsplash'

	export let Hst: Hst

	const collection = [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' }
  ]

	let selected: IList[] | null = null
	let asyncOptions: Basic[] = []

	const searchCollections = async (filterText: string): Promise<Basic[]> => {
		if (!filterText.length) return asyncOptions

		const { response } = await unsplash.search.getCollections({
			query: filterText
		})

		asyncOptions = response?.results ?? []

		return asyncOptions
	}
</script>

<Hst.Story>
	<Hst.Variant title="default">
    <UtilsSearchInput
			bind:value={selected}
			items={collection}
			multiple
			placeholder="Search images"
		>
			<div slot="item" let:prop={{ item }}>
				{ item.label }
			</div>
		</UtilsSearchInput>

		<div class="mt-4">
			Data: { JSON.stringify(selected) }
		</div>
  </Hst.Variant>

	<Hst.Variant title="async">
    <UtilsSearchInput
			bind:value={selected}
			loadOptions={searchCollections}
			itemId="id"
			label="title"
			multiple
			placeholder="Search images"
			debounceWait={500}
			clearFilterTextOnBlur={false}
			closeListOnChange={false}
		>
			<div slot="item" let:prop={{ item }}>
				<span>{ item.title }</span>
				<span>({ item.user.username })</span>
				<span>count: { item.total_photos }</span>
			</div>

			<div slot="selection" let:selection>
				<span>{selection.title}</span>
				<span>({selection.user.username})</span>
			</div>
		</UtilsSearchInput>

		<div class="mt-4">
			Data: { JSON.stringify(selected) }
		</div>
  </Hst.Variant>
</Hst.Story>
