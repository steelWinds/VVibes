import { supportWorkerTest } from '$lib/utils/@support/worker'
import { median } from './internal/median'

type TMedianCutReturn = ReturnType<typeof median>
type TMedianCutOptions = Omit<IMedianOptions, 'worker'> & { withWorker?: boolean }

export const medianCut = async (options: TMedianCutOptions): TMedianCutReturn => {
  const { withWorker = true, ...medianOptions } = options

  let worker: Worker | null = null

  const isWorkerAvailable = supportWorkerTest()

  if (global.Worker && isWorkerAvailable && withWorker) {
    worker = new Worker(new URL('./quantization-worker.ts', import.meta.url), {
      type: 'module'
    })
  }

  return await median({ ...medianOptions, worker })
}
