import { useStore, writable } from './store'

export const $pointerPosition = writable({ x: 0, y: 0 })

export const usePointerPosition = () => {
  return useStore($pointerPosition)
}