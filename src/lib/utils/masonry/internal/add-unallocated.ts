interface IAddUnallocated<T> {
	matrix: T[][]
	unallocated: T[]
}

export const addUnallocated = <T>(options: IAddUnallocated<T>): T[][] => {
	const { matrix, unallocated } = options

	const matrixCopy = [...matrix]

	const matrixCols = matrix.length

	let idx = 0

	while (idx < unallocated.length) {
		const realIdx = idx % unallocated.length
		const currCol = idx % matrixCols
		const nextCol = (idx + 1) % matrixCols

		if (matrixCopy[currCol] > matrixCopy[nextCol]) {
			idx++

			continue
		}

		matrixCopy[currCol].push(unallocated[realIdx])

		idx++
	}

	return matrixCopy
}
