import { mapValues, round } from 'lodash-es'

export const getColor = (RGBValues: IRGBData[]): IRGBData => {
  const color = RGBValues.reduce(
    (prev, curr) => {
      prev.r += curr.r
      prev.g += curr.g
      prev.b += curr.b

      return prev
    }, { r: 0, g: 0, b: 0 }
  )

  const roundedColor = mapValues(color, (value) => round(value / RGBValues.length))

  return roundedColor
}
