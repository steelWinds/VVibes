import { buildRGBData } from '../build-rgb-data'
import { quantization } from '../quantization'

export const getRGBColors = (options: IGetRGBColorsOptions, quantizationOptions: IQuantizationOptions): IRGBData[] => {
  const RGBValues = buildRGBData(options.imageBytes)

  const RGBSet = quantization({ RGBValues, ...quantizationOptions })

  return RGBSet
}
