interface IExtractCanvasOptions {
  src: string
	inlineSize?: number
	blockSize?: number
}

export const extractToCanvas = async (options: IExtractCanvasOptions): Promise<Uint8ClampedArray | null> => {
  const { src, inlineSize, blockSize } = options
	const img = document.createElement('img')

	img.setAttribute('src', src)
	img.setAttribute('crossOrigin', 'anonymous')

	try {
		await new Promise((resolve, reject) => {
			img.onload = resolve
			img.onerror = reject
		})

		const canvas = document.createElement('canvas')

		canvas.width = inlineSize ?? canvas.width
		canvas.height = blockSize ?? canvas.height

		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

		ctx.drawImage(
			img,
			0,
			0,
			canvas.width,
			canvas.height
		)

		return ctx.getImageData(0, 0, canvas.width, canvas.height).data
	} catch {
		throw new Error('Image could not be loaded')
	}
}
