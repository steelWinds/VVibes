import type { ActionReturn } from 'svelte/action'
import gcd from 'compute-gcd'

interface IUseImageSkeleton {
	color: string
	inlineSize: number
	blockSize: number
}

const resizeTarget = (target: HTMLElement, width: number, ratio: number): void => {
	const calculatedHeight = width * ratio

	target.style.height = `${calculatedHeight}px`
}

const onInitHandler = (node: Node, options: IUseImageSkeleton): ResizeObserver => {
	const { color, blockSize, inlineSize } = options

	const sizesGcd = gcd(inlineSize, blockSize)
	const ratio = (blockSize / sizesGcd) / (inlineSize / sizesGcd)

	const target = node as HTMLElement

	target.style.backgroundColor = color

	const { clientWidth } = target

	resizeTarget(target, clientWidth, ratio)

	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			const { inlineSize } = entry.contentBoxSize[0]

			resizeTarget(target, inlineSize, ratio)
		}
	})

	observer.observe(target)

	return observer
}

export const useImageSkeleton = (node: Node, options: IUseImageSkeleton): ActionReturn => {
  const observer = onInitHandler(node, options)

  return {
    destroy () {
			observer.disconnect()
		},

		update (_options) {
			const updateOptions = _options as never as IUseImageSkeleton

			if (updateOptions.blockSize === options.blockSize && updateOptions.inlineSize === options.inlineSize) return

			observer.disconnect()

			onInitHandler(node, options)
		}
  }
}
