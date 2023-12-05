import { writable } from 'svelte/store'

type TWatchFunction<T> = (old: T, current: T) => unknown

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const watcher = <T>(initialValue: T, watchFunction: TWatchFunction<T>) => {
	const { subscribe, update } = writable(initialValue)

	return {
		subscribe,
		set: (value: T) => {
			update(oldvalue => {
				watchFunction(oldvalue, value)

				return value
			})
		}
	}
}
