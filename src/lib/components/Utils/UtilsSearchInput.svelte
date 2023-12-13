<script setup lang="ts">
	import Select from 'svelte-select'
	import { Button, P, Spinner } from 'flowbite-svelte'
	import { SearchOutline, MicrophoneSolid, CloseOutline, DropboxSolid } from 'flowbite-svelte-icons'
	import { createEventDispatcher } from 'svelte'

	export let value: any[] | null = []

	interface Events {
		search: any
		audio: any
	}

	const dispatch = createEventDispatcher<Events>()
</script>

<div class="utils-search-input">
	<Select {...$$restProps} bind:value={value} class="h-full !px-0">
		<div slot="loading-icon">
			<Spinner class="w-6" />
		</div>

		<div class="px-3" slot="prepend">
			<SearchOutline class="w-5 text-primary-700" />
		</div>

		<svelte:fragment slot="clear-icon">
			<CloseOutline class="w-3 text-primary-700" />
		</svelte:fragment>

		<div slot="empty" class="py-2 flex flex-col items-center">
			<DropboxSolid class="w-24 h-24 mb-4 text-primary-700" />

			<P weight="medium" color="text-primary-700">
				Oh, is empty!
			</P>
		</div>
	</Select>

	<div class="utils-search-input__btns">
		<Button on:click={() => dispatch('audio')}>
			<MicrophoneSolid class="w-4 h-4 me-2 -ms-1" />

			Audio
		</Button>

		<Button on:click={() => dispatch('search')}>
			<SearchOutline class="w-5 h-5 me-2 -ms-1" />

			Search
		</Button>
	</div>
</div>

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
		grid-template-rows: minmax(42px, auto) auto;
		align-items: start;
		gap: 10px;

		@media screen(tablet) {
			grid-template-rows: 1fr;
			grid-template-columns: 1fr auto;
		}
	}

	.utils-search-input__btns {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
	}
</style>
