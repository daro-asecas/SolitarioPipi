import { useStore, writable } from './store'

interface PilesPosition {
  top: number[]
  bottom: number[]
  verticalLimit: number
}

const pilesPositionBlank = (): PilesPosition => ({
  top: [],
  bottom: [],
  verticalLimit: 0,
})

const $pilesPosition = writable(pilesPositionBlank())

export const usePilesPosition = () => {
  return useStore($pilesPosition)
}

export const updatePilesPosition = (where: "top" | "bottom" | "deck", pileIndex: number, x: number, y: number) => {
  
  const v = { ...$pilesPosition.get() };
  
  if (where === 'top' || where === 'bottom') {
    v[where][pileIndex] = x
  }
  
  if (where === 'bottom' && pileIndex === 0) {
    v.verticalLimit = y
  }

  $pilesPosition.set(v);
}
