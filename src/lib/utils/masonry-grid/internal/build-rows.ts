import gcd from 'compute-gcd'
import { floor } from 'lodash-es'
import type { IMasonryRow, TMasonryItems, TMasonryRows } from './types'

interface IMasonryBuildRowsOptions<T> {
	items: TMasonryItems<T>
	columnSize: number
}

export const buildRows = <T>(options: IMasonryBuildRowsOptions<T>): TMasonryRows<T> => {
	const { items, columnSize } = options

	const rows = items.map<IMasonryRow & T>((item) => {
		const { width, height } = item

		const sizesGcd = gcd(width, height)
		const ratio = (height / sizesGcd) / (width / sizesGcd)

		return {
			...item,
			id: item.id,
      inlineSize: columnSize,
      blockSize: floor(ratio * columnSize)
    }
	})

	return rows
}
