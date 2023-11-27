import config from '~/tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'

export type TBreakpointsKeys = 'mobile' | 'tablet' | 'desktop' | 'ultrabook' | 'laptop'

export const tailwindBreakpoints = resolveConfig(config).theme?.screens as Record<TBreakpointsKeys, string>
