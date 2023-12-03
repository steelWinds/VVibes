import type { ActionReturn } from 'svelte/action'

interface IUseLazyImage {
	src: string
}

const onLazyImageHandler = (node: Node, options: IUseLazyImage): () => void => {
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

	const _clear = (): void => {
		target.removeEventListener('load', loaded)
		observer.disconnect()
	}

	return _clear
}

export const useLazyImage = (node: Node, options: IUseLazyImage): ActionReturn => {
	const clearLazyImage = onLazyImageHandler(node, options)

	return {
		destroy () {
			clearLazyImage()
		},

		update (_options) {
      const options = _options as never as IUseLazyImage

			clearLazyImage()

			onLazyImageHandler(node, options)
		}
	}
}
