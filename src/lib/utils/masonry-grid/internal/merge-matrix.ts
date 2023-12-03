import { createColumns } from './create-columns'
import { buildRows } from './build-rows'
import type { IMasonryReturn, TMasonryItems, TMasonryMatrix } from './types'

export interface IMasonryMergeColumnsOptions<T> {
	matrix: TMasonryMatrix<T>
	matrixColumnBlockSizes: number[]
	items: TMasonryItems<T>
	columnSize: number
}

export const mergeMatrix = <T>(options: IMasonryMergeColumnsOptions<T>): IMasonryReturn<T> => {
	const { matrix, matrixColumnBlockSizes, items, columnSize } = options

	const rows = buildRows({ items, columnSize })

	const [newMatrix, columnBlockSizes] = createColumns({ count: matrix.length, rows, columnBlockSizes: matrixColumnBlockSizes })

	const mergeMatrix = matrix.map((column, id) => {
		const mergeColumn = [...column, ...newMatrix[id]]

		return mergeColumn
	})

	return {
		matrix: mergeMatrix,
		columnBlockSizes
	}
}
