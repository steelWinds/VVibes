<script lang="ts">
	import { Button } from 'flowbite-svelte'
  import { page } from '$app/stores'
	import { FaceMindBlowSolid } from 'flowbite-svelte-icons'
	import UIIconCard from '$lib/components/UI/UIIconCard.svelte'
	import AppUnsplashImagesList from '$lib/components/App/AppUnsplashImagesList.svelte'

	let hasImages = false

	$: query = $page.url.searchParams.get('query')
</script>

<div class='flex flex-col p-3'>
	{#if query}
		<AppUnsplashImagesList
			{query}
			bind:hasImages={hasImages}
		/>
	{/if}

	{#if !query}
		<UIIconCard icon={FaceMindBlowSolid} title='Empty query? WTF bruh?!' />
	{/if}

	<Button href="/" class={hasImages ? 'fixed bottom-3 right-3 z-20' : 'self-center mt-4'}>
		Back to Home
	</Button>
</div>
