import { rotate3dCalc } from '$lib/utils/rotate-3d-calc'
import type { ActionReturn } from 'svelte/action'

export const useRotateHover = (node: Node): ActionReturn => {
	const target = node as HTMLElement

	target.style.position = 'relative'

	const glowEl = document.createElement('div')

	glowEl.style.width = '100%'
	glowEl.style.height = '100%'
	glowEl.style.position = 'absolute'
	glowEl.style.inset = '0 auto auto 0'
	glowEl.style.zIndex = '1'
	glowEl.style.pointerEvents = 'none'
	glowEl.style.backgroundImage = 'radial-gradient(circle at 50% -20%, rgba(255, 255, 255, .1), transparent)'

	target.appendChild(glowEl)

	let targetBounds = target.getBoundingClientRect()

	const onRotateHover = (event: MouseEvent): void => {
		const { centerX, centerY, distance } = rotate3dCalc({ event, targetBounds })

		target.style.transform = `rotate3d(${centerY / 100}, ${-centerX / 100}, 0, ${Math.log(distance)}deg`

		glowEl.style.backgroundImage = `
			radial-gradient(
				circle at
				${((centerX * 2) + targetBounds.width / 2)}px
				${((centerY * 2) + targetBounds.height / 2)}px,
				rgba(255, 255, 255, .1),
				transparent
			)
		`
	}

  target.addEventListener('mousemove', onRotateHover, true)

	target.addEventListener('mouseout', () => {
		target.style.transform = ''

		glowEl.style.backgroundImage = 'radial-gradient(circle at 50% -20%, rgba(255, 255, 255, .1), transparent)'
	}, true)

  return {
    destroy () {
      target.removeEventListener('mousemove', onRotateHover, true)
    },

		update () {
			targetBounds = target.getBoundingClientRect()
		}
  }
}
