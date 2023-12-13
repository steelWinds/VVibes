import { createNamespace } from '../internal/create-namespace'
import { PUBLIC_GOOGLE_COMPLETE_SEARCH_URL } from '$env/static/public'

export const googleCompleteSearch = createNamespace({
  builder: (fetch) => ({
    get (q: string) {
      return fetch('/', {
				query: { q }
			})
    }
  }),
  ofetchOptions: {
		baseURL: PUBLIC_GOOGLE_COMPLETE_SEARCH_URL,
    query: {
			client: 'chrome'
		}
  }
})
