export interface IClickOutsideOptions {
  event: Event
  node: Node
  callback: () => void
}

export const clickOutside = (options: IClickOutsideOptions): void => {
  const { event, node, callback } = options

  const composed = event.composedPath()
  const target = event.target as HTMLElement
  const parentTarget = target.parentElement as HTMLElement

  const targetIsIgnoreOutside = !!target.dataset?.ignoreOutside
  const parentIsIgnoreOutside = !!parentTarget.dataset?.ignoreOutside

  if (targetIsIgnoreOutside || parentIsIgnoreOutside) return

  const isTriggeredOutside = !composed.includes(node) && target && !node.isSameNode(target)

  if (isTriggeredOutside) callback()
}
