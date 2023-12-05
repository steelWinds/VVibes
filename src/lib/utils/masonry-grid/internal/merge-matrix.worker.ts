import { buildRows } from './build-rows'
import { createColumns } from './create-columns'
import type { IMasonryMergeColumnsOptions } from './merge-matrix'

type IMergeMatrixWorkerOptions = IMasonryMergeColumnsOptions<never>

addEventListener('message', (e) => {
	const { matrix, matrixColumnBlockSizes, items, columnSize } = e.data as IMergeMatrixWorkerOptions

	const rows = buildRows({ items, columnSize })

	const [newMatrix, columnBlockSizes] = createColumns({ count: matrix.length, rows, columnBlockSizes: matrixColumnBlockSizes })

	const mergeMatrix = matrix.map((column, id) => {
		const mergeColumn = [...column, ...newMatrix[id]]

		return mergeColumn
	})

	postMessage({
		matrix: mergeMatrix,
		columnBlockSizes
	})
})
