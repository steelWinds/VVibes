import { ofetch, type $Fetch, type FetchOptions } from 'ofetch'

interface ICreateNamespaceOptions<T> {
  builder: (fetch: $Fetch) => T
  ofetchOptions?: FetchOptions
}

export const createNamespace = <T>(options: ICreateNamespaceOptions<T>): T => {
  const { builder, ofetchOptions = {} } = options

	console.log(options)

  const _fetch = ofetch.create(ofetchOptions)

  return builder(_fetch)
}
