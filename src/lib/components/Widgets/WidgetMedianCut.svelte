<script lang="ts">
	import Color from 'color'
	import { medianCut } from '$lib/utils/median-cut'
	import { Spinner } from 'flowbite-svelte'
	import { uniq } from 'lodash-es'
	import { clipboard } from '@svelte-bin/clipboard'
	import { toast } from '$lib/modules/svelte-toasts'
	import { BugOutline } from 'flowbite-svelte-icons'
	import UIIconCard from '$lib/components/UI/UIIconCard.svelte'
	import UiColorToast from '$lib/components/UI/UIColorToast.svelte'

	export let src: string = ''
	export let depth: number = 1
	export let maxDepth: number = 4
	export let blockSize: number = 500
	export let inlineSize: number = 500
	export let withWorker: boolean = true

	const getColors = async (): Promise<string[]> => {
		try {
			const median = (await medianCut(
				{ withWorker },
				{
					src,
					sizes: {
						blockSize,
						inlineSize
					}
				},
				{
					colorDepth: { depth, maxDepth }
				}
				)
			)

			return uniq(median.map(color => Color(color).hex()))
		} catch {
			throw new Error('Unexpected error, try again later')
		}
	}
</script>

<div class="grid">
	{#await getColors()}
		<Spinner class="justify-self-center self-center" />
	{:then colors}
		<div class="grid auto-rows-auto">
			{#each colors as color, idx (idx)}
				<button
					class="py-4"
					style:background={color}
					use:clipboard={color}
					on:copied={() => { toast(UiColorToast, { color, title: 'copied!' }) }}
				>
					<span class="p-2 px-4 bg-primary-700 text-white rounded-lg">
						{ color }
					</span>
				</button>
			{/each}
		</div>
	{:catch error}
		<div class="justify-self-center self-center">
			<UIIconCard icon={BugOutline} title={error.message} />
		</div>
	{/await}
</div>
