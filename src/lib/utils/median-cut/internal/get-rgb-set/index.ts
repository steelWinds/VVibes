import { buildRGB } from '../buildRGB'
import { quantization } from '../quantization'

interface IGetRGBSetOptions {
  imageData: ImageData
  colorDepth: IColorDepth
}

export const getRGBSet = (options: IGetRGBSetOptions): IRGBData[] => {
  const { imageData, colorDepth } = options

  const RGBValues = buildRGB(imageData.data)

  const RGBSet = quantization({ RGBValues, colorDepth })

  return RGBSet
}
