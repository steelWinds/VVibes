import gcd from 'compute-gcd'
import { floor } from 'lodash-es'

interface IMasonryItem {
	id: number
	width: number
	height: number
}

interface IMasonryOptions {
	columnCount: number
	columnSize: number
	items: IMasonryItem[]
}

export const createMasonryGrid = (options: IMasonryOptions): void => {
	const { columnSize, items } = options

	// const columns = Array.from({ length: columnCount }, () => [])
	// const columnBlockSize = Array.from({ length: columnCount }, () => -1)

	const itemsWithColumnsSizes = items.map(({ width, height, id }) => {
		const sizesGcd = gcd(width, height)
		const ratio = (height / sizesGcd) / (width / sizesGcd)

		return {
      id,
      inlineSize: columnSize,
      blockSize: floor(ratio * columnSize)
    }
	})

	itemsWithColumnsSizes.sort((a, b) => b.blockSize - a.blockSize)

	console.log(itemsWithColumnsSizes)
}
