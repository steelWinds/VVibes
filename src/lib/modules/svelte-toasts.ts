import type { ComponentProps, ComponentType } from 'svelte'
import { toast as _toast } from '@zerodevx/svelte-toast'

export const toast = <T extends ComponentType>(src: T, props: ComponentProps<InstanceType<T>>): void => {
	_toast.push({
		component: {
			src,
			props
		}
	})
}
