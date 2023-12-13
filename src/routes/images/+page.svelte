<script lang="ts">
	import { onMount } from 'svelte'
  import { page } from '$app/stores'
	import { api } from '$lib/api'

	$: collectionsArray = $page.url.searchParams.get('collections')?.split(',') ?? []

	const completeSearch = async (): Promise<void> => {
		const r = await api.search.get('nat')

		console.log(r)
	}

	onMount(() => {
		void completeSearch()
	})
</script>

<div>
	{ collectionsArray }
</div>
