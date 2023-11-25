/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-new */

export const supportWorkerTest = (): boolean => {
  let supports = false

  const tester: any = {
    get type () {
      return (supports = true)
    }
  }

  try {
    new Worker('blob://', tester)
  } finally {
    return supports
  }
}
