import { getRGBColors } from '.'

addEventListener('message', (e) => {
	const { imageBytes, colorDepth } = e.data

  const result = getRGBColors({ imageBytes }, { colorDepth })

  postMessage(result)
})
