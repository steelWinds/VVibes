export interface IMasonryItem {
	id: number | string
	width: number
	height: number
}

export interface IMasonryRow {
	id: number | string
	inlineSize: number
	blockSize: number
}

export interface IMasonryReturn<T> {
	matrix: TMasonryMatrix<T>
	columnBlockSizes: number[]
}

export type TMasonryItems<T> = Array<T & IMasonryItem>
export type TMasonryRows<T> = Array<T & IMasonryRow>
export type TMasonryMatrix<T> = Array<TMasonryRows<T>>
