import type { TMasonryMatrix, TMasonryRows } from './types'

interface IMasonryCreateColumnsOptions<T> {
	count: number
	rows: TMasonryRows<T>
	columnBlockSizes?: number[]
}

type IMasonryCreateColumnsReturn<T> = [TMasonryMatrix<T>, number[]]

export const createColumns = <T>(options: IMasonryCreateColumnsOptions<T>): IMasonryCreateColumnsReturn<T> => {
	const { rows, count, columnBlockSizes: _columnBlockSizes } = options

	const columnBlockSizes = _columnBlockSizes ?? Array.from({ length: count }, () => 0)

	const columns: TMasonryMatrix<T> = Array.from({ length: count }, () => [])

	for (const item of rows) {
		let shortest = 0

		for (let i = 1; i < count; ++i) {
			if (columnBlockSizes[i] < columnBlockSizes[shortest]) {
				shortest = i
			}
		}

		columnBlockSizes[shortest] += item.blockSize
		columns[shortest].push(item)
	}

	return [columns, columnBlockSizes]
}
