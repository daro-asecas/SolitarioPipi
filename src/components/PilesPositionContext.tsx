import React, { ReactNode, useContext, useState, useEffect } from 'react';

interface PilesPosition {
  top:    number[],
  bottom: number[],
  verticalLimit: number
}

const pilesPositionBlank = {
  top:    Array(0),
  bottom: Array(0),
  verticalLimit: 0
}

const PilesPositionContext = React.createContext<PilesPosition>(pilesPositionBlank)
const PilesPositionUpdateContext = React.createContext<Function>(()=>{})

export function UsePilesPosition() {
  return useContext(PilesPositionContext)
}

export function UsePilesPositionUpdate() {
  return useContext(PilesPositionUpdateContext)
}

export default function PilesPositionProvider({children}:{children:ReactNode}) {

  // interface SinglePilePosition {
  //   X: number
  //   Y: number
  // }

  // interface PilesPosition { [key: string] : number }
  // interface PilesPosition { [key: string] : SinglePilePosition[] }

  // const pilesPosition = {
  //   top:    Array(0),
  //   bottom: Array(0),
  //   verticalLimit: 0
  // }

  const [pilesPosition, setPilesPosition] = useState({
    top:    Array(0),
    bottom: Array(0),
    verticalLimit: 0
  })

  const updatePosition = ((where:string, pileIndex:number, X:number, Y:number) => {
    if (where=="top" || where == "bottom") {
      pilesPosition[where][pileIndex] = X
    }
    if (where=="bottom" && pileIndex==0) {
      pilesPosition.verticalLimit = Y
    }
  })
  
  return (
    <>
      <PilesPositionContext.Provider value={pilesPosition}>
        <PilesPositionUpdateContext.Provider value={updatePosition}>
          {children}
        </PilesPositionUpdateContext.Provider>
      </PilesPositionContext.Provider>
    </>
  );
}