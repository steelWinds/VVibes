export const imageLazyLoad = async (source: string): Promise<HTMLImageElement> => {
  return await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.setAttribute('src', source)
    image.setAttribute('crossOrigin', 'anonymous')

    if (image.complete) {
      resolve(image)
    }

    image.onload = () => {
      resolve(image)
    }

    image.onerror = () => {
      reject(new Error("Image is don't load"))
    }
  })
}
