interface IColorDepth {
  depth: number
  maxDepth: number
}

interface IMedianOptions {
  src: string
  worker: Worker | null
	sizes?: { inlineSize?: number, blockSize?: number }
}

interface IMedianCutOptions {
  withWorker?: boolean
}

interface IQuantizationOptions {
	colorDepth?: IColorDepth
}

interface IGetRGBColorsOptions {
  imageBytes: Uint8ClampedArray
}

interface IRGBData {
  r: number
  g: number
  b: number
}
