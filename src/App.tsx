import React, { useState, useEffect } from 'react';
import Match from './models/match';
import './styles/styles.css';

import {WrapperTop} from "./components/WrapperTop"
import {WrapperBottom} from "./components/WrapperBottom"


function App() {
 
 
  // useEffect(() => {
  //   const script = document.createElement('script');
  
  //   script.src = './models/match';
  //   script.async = true;
  
  //   document.body.appendChild(script);
  
  //   return () => {
  //     document.body.removeChild(script);
  //   }
  // }, []);

  
  const match = new Match()
  const [pilesTop, setPilesTop] = useState(match.pilesTop);
  const [pilesBottom, setPilesBottom] = useState(match.pilesBottom);




  return (
    <div>
      <WrapperTop pilesTop={pilesTop} />
      <WrapperBottom pilesBottom={pilesBottom} />
    </div>
  );
}

export default App;
