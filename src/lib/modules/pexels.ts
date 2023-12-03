import { createClient } from 'pexels'
import { PUBLIC_PEXELS_API_KEY } from '$env/static/public'

export const pexels = createClient(PUBLIC_PEXELS_API_KEY)
