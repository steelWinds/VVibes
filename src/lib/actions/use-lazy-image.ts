import type { ActionReturn } from 'svelte/action'

interface IUseLazyImage {
	src: string
}

export const useLazyImage = (node: Node, options: IUseLazyImage): ActionReturn => {
	const { src } = options

	const target = node as HTMLImageElement

	target.style.opacity = '0'

	const loaded = (): void => {
		target.style.opacity = '1'
	}

	const observer = new IntersectionObserver(entries => {
		if (entries[0].isIntersecting) {
			target.src = src

			target.complete ? loaded() : target.addEventListener('load', loaded)
		}
	}, { root: null, rootMargin: '0px', threshold: 0 })

	observer.observe(target)

	return {
		destroy () {
			target.removeEventListener('load', loaded)
			observer.disconnect()
		}
	}
}
