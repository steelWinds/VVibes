interface IExtractCanvasOptions {
  image: HTMLImageElement
  canvas: HTMLCanvasElement
  sizes?: { inline: number, block: number }
  setCanvasSize?: boolean
}

export const extractToCanvas = async (options: IExtractCanvasOptions): Promise<ImageData | null> => {
  const { image, canvas, sizes, setCanvasSize = false } = options

  if (!image.hasAttribute('crossOrigin')) {
    image.setAttribute('crossOrigin', 'anonymous')
  }

  const inlineSize = sizes?.inline ?? image.naturalWidth ?? image.width
  const blockSize = sizes?.block ?? image.naturalHeight ?? image.height

  if (setCanvasSize) {
    canvas.width = inlineSize
    canvas.height = blockSize
  }

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    inlineSize,
    blockSize
  )

  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}
