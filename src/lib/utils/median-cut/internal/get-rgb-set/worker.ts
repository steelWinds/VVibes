import { getRGBSet } from '../get-rgb-set'

addEventListener('message', (e) => {
  const imageData = e.data.imageData as ImageData
  const colorDepth = e.data.colorDepth as IColorDepth

  const result = getRGBSet({ imageData, colorDepth })

  postMessage(result)
})
