export default function DealButton( {text,callback}:{text:string,callback:Function} ) {
  return (
    <button type="button" className={`button-${callback.name}`} onClick={() => callback()} >{text}</button>
  );
}