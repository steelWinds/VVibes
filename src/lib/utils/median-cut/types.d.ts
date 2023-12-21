interface IColorDepth {
  depth: number
  maxDepth: number
}

interface IMedianOptions {
  src: string
  colorDepth: IColorDepth
  worker: Worker | null
	sizes?: { inlineSize?: number, blockSize?: number }
}

interface IMedianCutOptions {
  withWorker?: boolean
}

interface IRGBData {
  r: number
  g: number
  b: number
}
