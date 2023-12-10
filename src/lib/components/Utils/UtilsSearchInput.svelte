<script context="module" lang="ts">
	export interface IList {
		value: string | number
		label: string
	}
</script>

<script setup lang="ts">
	import Select from 'svelte-select'
	import { Button, P, Spinner } from 'flowbite-svelte'
	import { SearchOutline, MicrophoneSolid, CloseOutline, DropboxSolid } from 'flowbite-svelte-icons'

	export let value: any[] | null = []
</script>

<div class="utils-search-input">
	<Select {...$$restProps} bind:value={value} class="utils-search-input__search !px-0">
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

		<!-- External slots -->

		<svelte:fragment slot="item" let:item let:index>
			<slot prop={{ item, index }} name="item" />
		</svelte:fragment>

		<svelte:fragment slot="selection" let:selection>
			<slot {selection} name="selection" />
		</svelte:fragment>

		<!-- External slots -->
	</Select>

	<div class="utils-search-input__btns">
		<Button class="h-[48px]">
			<MicrophoneSolid class="w-4 h-4 me-2 -ms-1" />

			Audio
		</Button>

		<Button class="h-[48px]">
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

		display: grid;
		grid-template-rows: repeat(2, auto);
		align-items: start;
		gap: 10px;

		@media screen(mobile) {
			grid-template-rows: 1fr;
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.utils-search-input__btns {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
	}
</style>
