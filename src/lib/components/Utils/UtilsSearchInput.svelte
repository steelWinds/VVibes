<script setup lang="ts">
	import Select from 'svelte-select'
	import { Button, Spinner } from 'flowbite-svelte'
	import UIIconCard from '$lib/components/UI/UIIconCard.svelte'
	import { SearchOutline, ImageOutline, CloseOutline, DropboxSolid } from 'flowbite-svelte-icons'
	import { createEventDispatcher } from 'svelte'

	export let value: any[] | null = []
	export let search: string = ''

	interface Events {
		search: any
		filter: any
		change: any
	}

	const dispatch = createEventDispatcher<Events>()
</script>

<form class="utils-search-input" on:submit|preventDefault={() => dispatch('search')}>
	<Select
		{...$$restProps}
		bind:value={value}
		bind:filterText={search}
		class="h-full !px-0"
		on:filter={() => dispatch('filter')}
		on:change={() => dispatch('change')}
	>
		<div slot="loading-icon">
			<Spinner class="w-6" />
		</div>

		<div class="px-3" slot="prepend">
			<ImageOutline class="w-5 text-primary-700" />
		</div>

		<svelte:fragment slot="clear-icon">
			<CloseOutline class="w-3 text-primary-700" />
		</svelte:fragment>

		<div slot='empty' class="py-2">
			<UIIconCard icon={DropboxSolid} title='Oh, is empty!' />
		</div>
	</Select>

	<Button type="submit">
		<SearchOutline class="w-5 h-5 me-2 -ms-1" />

		Search
	</Button>
</form>

<style lang="postcss">
	.utils-search-input {
		--border-focused: theme(colors.primary.700) 1px solid;
		--item-hover-bg: theme(colors.primary.200);
		--item-is-active-bg: theme(colors.primary.700);
		--list-max-height: 300px;
		--multi-select-input-margin: 0px;
		--height: auto;
		--item-padding: 8px 20px;

		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr auto;
		align-items: start;
		gap: 10px;
	}
</style>
