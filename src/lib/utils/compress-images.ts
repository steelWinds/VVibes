import imageCompression, { type Options as ImageCompressionOptions } from 'browser-image-compression'

interface ICompressImageOptions {
  images: File[]
  compressOptions: ImageCompressionOptions
}

export const compressImages = async (options: ICompressImageOptions): Promise<File[]> => {
  const DEFAULT_COMPRESS_OPTIONS: ImageCompressionOptions = {
    maxSizeMB: 0.9,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  const { images, compressOptions = DEFAULT_COMPRESS_OPTIONS } = options

  const promises = images.map(
    async (image) => imageCompression(image, Object.assign(compressOptions, options))
  )

  return (await Promise.allSettled(promises))
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<File>).value)
}
