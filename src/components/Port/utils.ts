export const isEl = <T extends HTMLElement>(el: unknown): el is T => {
  return typeof el === 'object' && el instanceof HTMLElement
}