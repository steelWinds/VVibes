interface IColorDepth {
  depth: number
  maxDepth: number
}

interface IMedianOptions {
  image: HTMLImageElement
  canvas: HTMLCanvasElement
  colorDepth: IColorDepth
  worker: Worker | null
}

interface IRGBData {
  r: number
  g: number
  b: number
}
