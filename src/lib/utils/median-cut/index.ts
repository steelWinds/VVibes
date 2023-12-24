import { supportWorkerTest } from '$lib/utils/@support/worker'
import { median } from './internal/median'

type TMedianCutReturn = ReturnType<typeof median>

export const medianCut = async (
	options: IMedianCutOptions,
	medianCutOptions: Omit<IMedianOptions, 'worker'>,
	quantizationOptions: IQuantizationOptions
): TMedianCutReturn => {
  const { withWorker = true } = options

  let worker: Worker | null = null

  const isWorkerAvailable = supportWorkerTest()

  if (isWorkerAvailable && withWorker) {
    worker = new Worker(new URL('./internal/get-rgb-colors/worker.js', import.meta.url), {
      type: 'module'
    })
  }

  return await median({ ...medianCutOptions, worker }, quantizationOptions)
}
