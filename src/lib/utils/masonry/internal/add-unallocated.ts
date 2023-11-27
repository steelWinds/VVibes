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
		const col = idx % matrixCols

		matrixCopy[col].push(unallocated[realIdx])

		idx++
	}

	return matrixCopy
}
