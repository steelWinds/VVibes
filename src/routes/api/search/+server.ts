import { api } from '$lib/api'

export async function GET (event): Promise<Response> {
	const responseOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

	const query = event.url.searchParams.get('q') ?? ''

	if (!query) {
		return new Response(JSON.stringify([]), responseOptions)
	}

  const response = await api.googleCompleteSearch.get(query)

	const searchResult = JSON.parse(response)?.[1]

  return new Response(JSON.stringify(searchResult), responseOptions)
}
