import { getRGBSet } from './get-rgb-set'
import { extractToCanvas } from '$lib/utils/extract-to-canvas'
import { isNull } from 'lodash-es'

export const median = async (options: IMedianOptions): Promise<IRGBData[]> => {
  const DEFAULT_COLOR_DEPTH = { depth: 1, maxDepth: 1 }

  const { worker, colorDepth = DEFAULT_COLOR_DEPTH } = options

  const imageData = await extractToCanvas(options)

  if (!imageData) {
    throw new Error("Incorrect image's data")
  }

  if (!isNull(worker)) {
    return await new Promise((resolve) => {
      worker.postMessage({ imageData, colorDepth })

      worker.addEventListener('message', (e: MessageEvent<IRGBData[]>) => { resolve(e.data) })
    })
  }

  return getRGBSet({ imageData, colorDepth })
}
