import { getRGBSet } from './get-rgb-set'
import { extractToCanvas } from '$lib/utils/extract-to-canvas'
import { isNil } from 'lodash-es'

export const median = async (options: IMedianOptions): Promise<IRGBData[]> => {
  const DEFAULT_COLOR_DEPTH = { depth: 1, maxDepth: 1 }

  const { worker, colorDepth = DEFAULT_COLOR_DEPTH, sizes = {}, src } = options

  const imageBytes = await extractToCanvas({ ...sizes, src })

  if (!imageBytes?.length) {
    throw new Error("Incorrect image's data")
  }

	return new Promise((resolve, reject) => {
		if (!isNil(worker)) {
			worker.postMessage({ imageBytes, colorDepth })

			worker.addEventListener('message', (e: MessageEvent<IRGBData[]>) => { resolve(e.data) })

			worker.addEventListener('error', (e) => { reject(e) })
			worker.addEventListener('errormessage', (e) => { reject(e) })
		}

		resolve(getRGBSet({ imageBytes, colorDepth }))
	})
}
