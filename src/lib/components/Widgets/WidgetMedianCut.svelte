<script lang="ts">
	import Color from 'color'
	import { medianCut } from '$lib/utils/median-cut'
	import { onMount } from 'svelte'

	export let src: string = ''

	let colors: any[] = []

	const getColors = async (): Promise<void> => {
		try {
			const medianCutOptions = {
				src,
				colorDepth: { depth: 12, maxDepth: 14 },
				sizes: {
					blockSize: 300
				}
			}

			const median = (await medianCut({ withWorker: true }, medianCutOptions))

			colors = median.map(color => Color(color).hex())
		} catch (e) {
			console.log(e.message)
		}
	}

	onMount(getColors)
</script>

<div class="grid grid-rows-4">
	{#each colors as color, idx (idx)}
		<button style:background={color}>
			<span class="p-2 px-4 bg-primary-700 text-white rounded-lg">
				{ color }
			</span>
		</button>
	{/each}
</div>
