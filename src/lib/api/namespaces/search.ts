import { createNamespace } from '../internal/create-namespace'

export const search = createNamespace({
  builder: (fetch) => ({
    get (q: string) {
      return fetch('/api/search', {
				query: { q }
			})
    }
  }),
  ofetchOptions: {
		baseURL: '/'
  }
})
