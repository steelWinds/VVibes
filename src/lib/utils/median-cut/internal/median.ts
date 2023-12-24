import { getRGBColors } from './get-rgb-colors'
import { extractToCanvas } from '$lib/utils/extract-to-canvas'
import { isNil } from 'lodash-es'

export const median = async (options: IMedianOptions, quantizationOptions: IQuantizationOptions): Promise<IRGBData[]> => {
  const { worker, sizes = {}, src } = options

  const imageBytes = await extractToCanvas({ ...sizes, src })

  if (!imageBytes?.length) {
    throw new Error("Incorrect image's data")
  }

	return new Promise((resolve, reject) => {
		if (!isNil(worker)) {
			worker.postMessage({ imageBytes, ...quantizationOptions })

			worker.addEventListener('message', (e: MessageEvent<IRGBData[]>) => { resolve(e.data) })

			worker.addEventListener('error', (e) => { reject(e) })
			worker.addEventListener('errormessage', (e) => { reject(e) })
		}

		resolve(getRGBColors({ imageBytes }, quantizationOptions))
	})
}
