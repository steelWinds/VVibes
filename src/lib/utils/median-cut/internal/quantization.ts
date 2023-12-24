import { isNull, floor } from 'lodash-es'
import { biggestRGBChannel } from './biggest-rgb-channel'
import { reduceRGBData } from './reduce-rgb-data'

interface IQuantizationOptions {
  RGBValues: IRGBData[]
  colorDepth?: IColorDepth
}

const DEFAULT_COLOR_DEPTH = { depth: 0, maxDepth: 4 }

export const quantization = (options: IQuantizationOptions): IRGBData[] => {
  const { RGBValues, colorDepth } = options

  const { depth, maxDepth } = colorDepth ?? DEFAULT_COLOR_DEPTH

  if (depth === maxDepth) return [reduceRGBData(RGBValues)]

  const mid = floor(RGBValues.length / 2)

  const nextDepth = { depth: depth + 1, maxDepth }

  const biggestChannelInRange = biggestRGBChannel(RGBValues)

  const sortedRGBValues = RGBValues.toSorted((prePixel, nextPixel) =>
		isNull(biggestChannelInRange) ? -1 : prePixel[biggestChannelInRange] - nextPixel[biggestChannelInRange])

  const rbgSliceStart = {
    RGBValues: sortedRGBValues.slice(0, mid),
    colorDepth: nextDepth
  }

  const rgbSliceEnd = {
    RGBValues: sortedRGBValues.slice(mid + 1),
    colorDepth: nextDepth
  }

  return [
    ...(quantization(rbgSliceStart) ?? []),
    ...(quantization(rgbSliceEnd) ?? [])
  ]
}
