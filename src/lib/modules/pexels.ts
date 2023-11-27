import { createClient } from 'pexels'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { PUBLIC_PEXELS_API_KEY } from '$env/static/public'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const pexels = createClient(PUBLIC_PEXELS_API_KEY)
