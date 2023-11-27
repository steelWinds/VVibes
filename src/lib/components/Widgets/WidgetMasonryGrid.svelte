<script lang="ts" generics="T">
	import { createMasonry, addUnallocated } from '$lib/utils/masonry/index'
	import { useMediaQuery } from 'svelte-breakpoints'
	import { onMount } from 'svelte'
	import { watcher } from '$lib/modules/watcher'

	interface IMasonryBreakpoint {
		cols: number
		breakpoint: number
	}

	export let data: T[] = []
	export let gap: number = 10
	export let minCols: number = 2
	export let colsSettings: IMasonryBreakpoint[] = []

	let cols = minCols
	const dataWatcher = watcher(data, watchFunction)

	let dataGroups = createMasonry({ data, cols })

	$: $dataWatcher = data
	$: style = `
		--gap: ${gap}px;
		--cols: ${cols};
	`

	function watchFunction (old: T[], next: T[]): void {
		const differenceLength = next.length - old.length

		if (!differenceLength) return

		const nextList = !old.length ? next : next.slice(differenceLength)

		dataGroups = addUnallocated({ matrix: dataGroups, unallocated: nextList })
	}

	onMount(() => {
		if (!colsSettings.length) return

		colsSettings.forEach(({ cols: breakpointCols, breakpoint }, idx) => {
			const str = `(min-width: ${breakpoint}px) ${colsSettings[idx + 1]?.breakpoint ? `and (max-width: ${colsSettings[idx + 1]?.breakpoint - 1}px)` : ''}`

			const breakpointQuery = useMediaQuery(str)

			breakpointQuery.subscribe((isActive) => {
				cols = isActive ? breakpointCols : cols

				dataGroups = createMasonry({ data, cols })
			})
		})

		const minBreakpointQuery = useMediaQuery(`(max-width: ${colsSettings[0].breakpoint})`)

		minBreakpointQuery.subscribe((isActive) => {
			if (isActive) {
				cols = minCols

				dataGroups = createMasonry({ data, cols })
			}
		})
	})
</script>

<div class="widget-masonry-grid" {style}>
	{#each dataGroups as group, groupIdx (groupIdx)}
		<div class="widget-masonry-grid__subgrid">
			{#each group as item, itemIdx (itemIdx)}
				<slot prop={{ item, itemIdx }} />
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	.widget-masonry-grid {
		--cols: 3;

		gap: var(--gap);
		grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
		display: grid;
		align-items: start;
	}

	.widget-masonry-grid__subgrid {
		display: grid;
		gap: inherit;
		align-items: start;
	}
</style>
