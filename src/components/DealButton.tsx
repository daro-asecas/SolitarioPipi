export default function DealButton ({ text, callback }:{text:string, callback:Function}) {
  return (
    <button type="button" className={`button-${text === 'Deal!' ? 'deal' : 'start'}`} onClick={() => callback()} >{text}</button>
  )
}
