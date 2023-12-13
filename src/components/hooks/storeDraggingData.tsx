import { useStore, writable } from './store'

interface DraggingData {
  isDraggingActive: boolean
  originWhere: string
  originPileIndex: number
  cardIndex: number
  quantityOfCards: number
  // dropPositionX: number
  // dropPositionY: number
  // currentPositionX: number
  // currentPositionY: number
  // destinPileIndex: number
}

const emptyDraggingData = {
  isDraggingActive: false,
  originWhere: '',
  originPileIndex: -1,
  cardIndex: -1,
  quantityOfCards: -1,
  // dropPositionX: -1,
  // dropPositionY: -1,
  // currentPositionX: -1,
  // currentPositionY: -1,
  // destinPileIndex: -1,
}

export const $draggingData = writable({ ...emptyDraggingData })

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