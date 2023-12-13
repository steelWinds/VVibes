<script lang="ts">
  import { page } from '$app/stores'
	import { FaceMindBlowSolid } from 'flowbite-svelte-icons'
	import UIIconCard from '$lib/components/UI/UIIconCard.svelte'
	import AppUnsplashImagesList from '$lib/components/App/AppUnsplashImagesList.svelte'

	$: query = $page.url.searchParams.get('query')
</script>

<div>
	{#if query}
		<AppUnsplashImagesList {query} />
	{/if}

	{#if !query}
		<UIIconCard icon={FaceMindBlowSolid} title='Empty query? WTF bruh?!' />
	{/if}
</div>
