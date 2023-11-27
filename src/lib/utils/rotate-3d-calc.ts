export interface IRotate3dCalcOptions {
	event: Event
	targetBounds: DOMRect
}

export interface IRotate3dCalc {
	centerX: number
	centerY: number
	distance: number
}

export const rotate3dCalc = (target: IRotate3dCalcOptions): IRotate3dCalc => {
	const { event, targetBounds } = target

	const e = event as MouseEvent

	const { clientX, clientY } = e

	const targetClientX = clientX - targetBounds.x
	const targetClientY = clientY - targetBounds.y

	const centerX = targetClientX - targetBounds.width / 2
	const centerY = targetClientY - targetBounds.height / 2

	const distance = Math.sqrt(centerX ** 2 + centerY ** 2)

	return {
		centerX,
		centerY,
		distance
	}
}
