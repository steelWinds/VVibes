import { createColumns } from './create-columns'
import { buildRows } from './build-rows'
import type { IMasonryReturn, TMasonryItems } from './types'

export interface IMasonryOptions<T> {
	columnCount: number
	columnSize: number
	items: TMasonryItems<T>
}

export const createMatrix = <T>(options: IMasonryOptions<T>): IMasonryReturn<T> => {
	const { columnSize, items, columnCount } = options

	const rows = buildRows({ items, columnSize })

	const [matrix, columnBlockSizes] = createColumns({ count: columnCount, rows })

	return {
		matrix,
		columnBlockSizes
	}
}
