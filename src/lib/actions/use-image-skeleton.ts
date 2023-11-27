import type { ActionReturn } from 'svelte/action'
import gcd from 'compute-gcd'

interface IUseImageSkeleton {
	color: string
	originalWidth: number
	originalHeight: number
}

const resizeTarget = (target: HTMLElement, width: number, ratio: number): void => {
	const calculatedHeight = width * ratio

	target.style.height = `${calculatedHeight}px`
}

export const useClickOutside = (node: Node, options: IUseImageSkeleton): ActionReturn => {
  const { color, originalHeight, originalWidth } = options

	const sizesGcd = gcd(originalWidth, originalHeight)
	const ratio = (originalHeight / sizesGcd) / (originalWidth / sizesGcd)

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

  return {
    destroy () {
			observer.disconnect()
		}
  }
}
