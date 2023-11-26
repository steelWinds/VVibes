import { createNamespace } from '../internal/create-namespace'

export default createNamespace({
  builder: (fetch) => ({
    getList () {
      return 1
    }
  }),
  ofetchOptions: {
    baseURL: import.meta.env.SVELTE_UNSPLASH_BASE_URL,
    headers: {
      Authorization: `Client-ID ${import.meta.env.SVELTE_UNSPLASH_API_KEY}`
    }
  }
})
