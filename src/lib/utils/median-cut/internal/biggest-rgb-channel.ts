export const biggestRGBChannel = (RGBValues: IRGBData[]): 'r' | 'g' | 'b' | null => {
  let rMax: number, gMax: number, bMax: number
  let rMin: number, gMin: number, bMin: number

  rMax = gMax = bMax = Number.NEGATIVE_INFINITY
  rMin = gMin = bMin = Number.POSITIVE_INFINITY

  RGBValues.forEach((pixel) => {
    rMax = Math.max(rMax, pixel.r)
    gMax = Math.max(gMax, pixel.g)
    bMax = Math.max(bMax, pixel.b)

    rMin = Math.min(rMin, pixel.r)
    gMin = Math.min(gMin, pixel.g)
    bMin = Math.min(bMin, pixel.b)
  })

  const rRange = rMax - rMin
  const gRange = gMax - gMin
  const bRange = bMax - bMin

  const range = Math.max(rRange, gRange, bRange)

  switch (range) {
    case rRange:
      return 'r'
    case gRange:
      return 'g'
    case bRange:
      return 'b'
    default:
      return null
  }
}
