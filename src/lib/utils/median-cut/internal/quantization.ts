import { isNull, floor } from 'lodash-es'
import { colorRange } from './color-range'
import { getColor } from './get-color'

interface IQuantizationOptions {
  RGBValues: IRGBData[]
  colorDepth?: IColorDepth
}

export const quantization = (options: IQuantizationOptions): IRGBData[] => {
  const DEFAULT_COLOR_DEPTH = { depth: 1, maxDepth: 1 }

  const { RGBValues, colorDepth } = options
  const { depth, maxDepth } = colorDepth ?? DEFAULT_COLOR_DEPTH

  if (depth >= maxDepth || RGBValues.length === 0) return [getColor(RGBValues)]

  const mid = floor(RGBValues.length / 2)
  const nextDepth = { depth: depth + 1, maxDepth }

  const chanInRange = colorRange(RGBValues)
  const sortedRGBValues = RGBValues.toSorted((prePixel, nextPixel) => isNull(chanInRange) ? -1 : prePixel[chanInRange] - nextPixel[chanInRange])

  const RGB_VALUES_START = {
    RGBValues: sortedRGBValues.slice(0, mid),
    colorDepth: nextDepth
  }

  const RGB_VALUES_END = {
    RGBValues: sortedRGBValues.slice(mid + 1),
    colorDepth: nextDepth
  }

  return [
    ...(quantization(RGB_VALUES_START) ?? []),
    ...(quantization(RGB_VALUES_END) ?? [])
  ]
}
