const RGB_STEP = 4

export const buildRGBData = (data: Uint8ClampedArray): IRGBData[] => {
  const rgbValues: IRGBData[] = []

  for (let i = 0; i < data.length; i += RGB_STEP) {
    rgbValues.push({
      r: data[i],
      g: data[i + 1],
      b: data[i + 2]
    })
  }

  return rgbValues
}
