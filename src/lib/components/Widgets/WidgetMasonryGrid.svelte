<script lang="ts" generics="T">
	import { useMediaQuery } from 'svelte-breakpoints'
	import { onMount } from 'svelte'
	import { watcher } from '$lib/modules/watcher'
	import { createMatrix, mergeMatrix, type TMasonryMatrix, type IMasonryItem } from '~/src/lib/utils/masonry-grid'

	type TDataList = T & IMasonryItem
	interface IMasonryBreakpoint {
		cols: number
		breakpoint: number
	}

	export let data: TDataList[] = []
	export let gap: number = 10
	export let minCols: number = 7
	export let colsSettings: IMasonryBreakpoint[] = []

	const { matrix, columnBlockSizes: _columnBlockSizes } = createMatrix({ columnCount: minCols, columnSize: 200, items: data })

	let cols = minCols
	let columnBlockSizes: number[] = _columnBlockSizes
	let dataGroups: TMasonryMatrix<T> = matrix

	const gridColumns: HTMLElement[] = []
	const dataWatcher = watcher(data, watchFunction)

	$: $dataWatcher = data
	$: style = `
		--gap: ${gap}px;
		--cols: ${cols};
	`

	function updateMatrix (cols: number): void {
		const { matrix, columnBlockSizes: _columnBlockSizes } = createMatrix({ items: data, columnCount: cols, columnSize: 200 })

		columnBlockSizes = _columnBlockSizes
		dataGroups = matrix
	}

	async function watchFunction (old: TDataList[], next: TDataList[]): Promise<void> {
		const differenceLength = next.length - old.length

		if (!differenceLength) return

		const nextList = !old.length ? next : next.slice(differenceLength)

		const { matrix, columnBlockSizes: _columnBlockSizes } = await mergeMatrix({
			matrix: dataGroups,
			matrixColumnBlockSizes: columnBlockSizes,
			items: nextList,
			columnSize: 200
		})

		columnBlockSizes = _columnBlockSizes
		dataGroups = matrix
	}

	onMount(() => {
		if (!colsSettings.length) return

		colsSettings.forEach(({ cols: breakpointCols, breakpoint }, idx) => {
			const str = `(min-width: ${breakpoint}px) ${colsSettings[idx + 1]?.breakpoint ? `and (max-width: ${colsSettings[idx + 1]?.breakpoint - 1}px)` : ''}`

			const breakpointQuery = useMediaQuery(str)

			breakpointQuery.subscribe((isActive) => {
				cols = isActive ? breakpointCols : cols

				updateMatrix(cols)
			})
		})

		const minBreakpointQuery = useMediaQuery(`(max-width: ${colsSettings[0].breakpoint})`)

		minBreakpointQuery.subscribe((isActive) => {
			if (isActive) {
				cols = minCols

				updateMatrix(cols)
			}
		})
	})
</script>

<div class="widget-masonry-grid" {style}>
	{#each dataGroups as group, groupIdx (groupIdx)}
		<div bind:this={gridColumns[groupIdx]} class="widget-masonry-grid__subgrid">
			{#each group as item, itemIdx (`${item.id}-${itemIdx}`)}
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
