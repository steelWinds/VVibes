import { clickOutside, type IClickOutsideOptions } from '$lib/utils/click-outside'
import type { ActionReturn } from 'svelte/action'

export const useClickOutside = (node: Node, props: Omit<IClickOutsideOptions, 'node'>): ActionReturn => {
  const onClickOutside = clickOutside.bind(this, { ...props, node })

  document.addEventListener('click', onClickOutside, true)

  return {
    destroy () {
      document.removeEventListener('click', onClickOutside, true)
    }
  }
}
