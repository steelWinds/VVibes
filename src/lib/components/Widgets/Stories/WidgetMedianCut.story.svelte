<script lang="ts">
	import WidgetMedianCut from '../WidgetMedianCut.svelte'
	import { onMount } from 'svelte'
	import { SvelteToast } from '@zerodevx/svelte-toast'

	const imageModules = import.meta.glob('../../../../tested-images/*.{jpg,png,jpeg,webp}')

	export let Hst: Hst

	const promises = Object.values(imageModules).map(v => v())
	const awaited = Promise.allSettled(promises)

	let images: string[] = []

	onMount(async () => {
		images = (await awaited).map((v) => v.value.default)
	})
</script>

<Hst.Story>
	<div class="p-2 mb-6">
		{#if images.length > 0}
			{#each images as src, idx (idx)}
				<div class="grid grid-cols-2 gap-4 w-full mb-2">
					<img {src} alt="Color" class="h-[300px] w-full object-cover">

					<WidgetMedianCut {src} depth={1} maxDepth={3} />
				</div>
			{/each}
		{/if}
	</div>

	<SvelteToast />
</Hst.Story>
