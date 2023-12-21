import { buildRGB } from '../buildRGB'
import { quantization } from '../quantization'

interface IGetRGBSetOptions {
  imageBytes: Uint8ClampedArray
  colorDepth: IColorDepth
}

export const getRGBSet = (options: IGetRGBSetOptions): IRGBData[] => {
  const { imageBytes, colorDepth } = options

  const RGBValues = buildRGB(imageBytes)

  const RGBSet = quantization({ RGBValues, colorDepth })

  return RGBSet
}
