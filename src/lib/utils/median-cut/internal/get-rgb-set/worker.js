import { getRGBSet } from '../get-rgb-set'

addEventListener('message', (e) => {
	const { imageBytes, colorDepth } = e.data

  const result = getRGBSet({ imageBytes, colorDepth })

  postMessage(result)
})
