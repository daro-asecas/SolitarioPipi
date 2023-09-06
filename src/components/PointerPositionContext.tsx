import React, { ReactNode, useContext, useState, useEffect } from 'react'

const DraggingContext = React.createContext<{}>({})

export function UseDraggingData() {
  return useContext(DraggingContext)
}

export default function PointerProvider({ children }: { children: ReactNode }) {
  interface DraggingData {
    isDraggingActive: boolean
    dropPositionX: number
    dropPositionY: number
    currentPositionX: number
    currentPositionY: number
    originWhere: string
    originPileIndex: number
    cardIndex: number
    quantityOfCards: number
    destinPileIndex: number
  }

  const emptyDraggingData = {
    isDraggingActive: false,
    dropPositionX: 0,
    dropPositionY: 0,
    currentPositionX: 0,
    currentPositionY: 0,
    originWhere: '',
    originPileIndex: 0,
    cardIndex: 0,
    quantityOfCards: 0,
    destinPileIndex: 0,
  }

  const [draggingData, setDraggingData] = useState<DraggingData>(emptyDraggingData)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setDraggingData(data => {
        const updatedData = { ...data }
        data.currentPositionX = event.clientX
        data.currentPositionY = event.clientY
        return updatedData
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <DraggingContext.Provider value={draggingData}>
        {draggingData.currentPositionX} {draggingData.currentPositionY}
        {children}
      </DraggingContext.Provider>
    </>
  )
}
