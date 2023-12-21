import { useStore, writable } from './store'
import { Card } from '../../models/deck'

interface DraggingData {
  isDraggingActive: boolean
  originWhere: "top" | "bottom" | "deck" | null
  originPileIndex: number
  cardIndex: number
  // baseCard: Card | null
  quantityOfCards: number
  // dropPositionX: number
  // dropPositionY: number
  // currentPositionX: number
  // currentPositionY: number
  // destinPileIndex: number
}

const emptyDraggingData = {
  isDraggingActive: false,
  originWhere: null,
  originPileIndex: -1,
  cardIndex: -1,
  // baseCard: null,
  quantityOfCards: -1,
  // dropPositionX: -1,
  // dropPositionY: -1,
  // currentPositionX: -1,
  // currentPositionY: -1,
  // destinPileIndex: -1,
}

export const $draggingData = writable<DraggingData>({ ...emptyDraggingData })

export const useDraggingData = () => {
  return useStore($draggingData)
}

export const updateDraggingData = (partial: Partial<DraggingData>) => {
  $draggingData.set({ ...$draggingData.get(), ...partial });
}

export const resetDraggingData = () => {
  $draggingData.set({ ...emptyDraggingData });
}

// export const updateDraggingData = <K extends keyof DraggingData>(key: K, value: DraggingData[K]) => {
//   const v = { ...$draggingData.get() };
//   $draggingData.set(v);
// }