import { supportWorkerTest } from '$lib/utils/@support/worker'
import { median } from './internal/median'

type TMedianCutReturn = ReturnType<typeof median>

export const medianCut = async (options: IMedianCutOptions, medianCutOptions: Omit<IMedianOptions, 'worker'>): TMedianCutReturn => {
  const { withWorker = true } = options

  let worker: Worker | null = null

  const isWorkerAvailable = supportWorkerTest()

  if (globalThis.Worker && isWorkerAvailable && withWorker) {
    worker = new Worker(new URL('./internal/get-rgb-set/worker.js', import.meta.url), {
      type: 'module'
    })
  }

  return await median({ ...medianCutOptions, worker })
}
