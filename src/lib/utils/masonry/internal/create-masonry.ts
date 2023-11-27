import { addUnallocated } from './add-unallocated'

interface IMasonryOptions<T> {
	data: T[]
	cols: number
}

export const createMasonry = <T>(options: IMasonryOptions<T>): T[][] => {
	const { data, cols } = options

	let result: T[][] = []

	result = Array.from({ length: cols }, () => [])

	result = addUnallocated({ matrix: result, unallocated: data })

	return result
}
