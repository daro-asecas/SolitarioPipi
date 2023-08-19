import React, { ReactNode, useContext, useState, useEffect } from 'react';

const PointerContext = React.createContext<{}>({})

export function UsePointerPosition() {
  return useContext(PointerContext)
}

export default function PointerProvider({ children }:{children:ReactNode }) {

  const [pointerPosition, setPointerPosition] = useState({x:0,y:0});

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPointerPosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => { window.removeEventListener('mousemove', handleMouseMove) };
  }, []);
  
  return (
    <>
      <PointerContext.Provider value={pointerPosition}>
    {pointerPosition.x} {pointerPosition.x}
        {children}
      </PointerContext.Provider>
    </>
  );
}