import { createApi } from 'unsplash-js'
import { PUBLIC_UNSPLASH_API_KEY } from '$env/static/public'

export const unsplash = createApi({
  accessKey: PUBLIC_UNSPLASH_API_KEY
})
