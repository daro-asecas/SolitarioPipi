import { useContext } from 'react'
import { MatchContext } from '../App'
import ShowPile from './ShowPile'

export default function WrapperBottom(
  // prettier-ignore
  {moveSubPile, riseCardWithDoubleClick}:
  // prettier-ignore
  {moveSubPile:Function, riseCardWithDoubleClick:Function},
) {
  const match = useContext(MatchContext)

  return (
    <div className="wrapper" id="wrapper-bottom">
      {match.pilesBottom.map((pile, i) => {
        return (
          <ShowPile
            key={i}
            where={'bottom'}
            pileIndex={i}
            pile={pile}
            stacked={false}
            moveSubPile={moveSubPile}
            riseCardWithDoubleClick={riseCardWithDoubleClick}
          />
        )
      })}
    </div>
  )
}
