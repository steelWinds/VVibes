import type { IMasonryReturn, TMasonryItems, TMasonryMatrix } from './types'

export interface IMasonryMergeColumnsOptions<T> {
	matrix: TMasonryMatrix<T>
	matrixColumnBlockSizes: number[]
	items: TMasonryItems<T>
	columnSize: number
}

export const mergeMatrix = <T>(options: IMasonryMergeColumnsOptions<T>): Promise<IMasonryReturn<T>> => {
	const worker = new Worker(new URL('./merge-matrix.worker.ts', import.meta.url), {
		type: 'module'
	})

	return new Promise<IMasonryReturn<T>>((resolve) => {
		worker?.postMessage(options)

		worker?.addEventListener('message', (e) => { resolve(e.data) })
	})
}
