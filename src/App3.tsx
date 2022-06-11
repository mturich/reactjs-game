import { useState, useEffect, useRef } from 'react';
import './App.css';
import Dimension from './Dimension';

function App() {
   const timerExpiredCallback = useRef(() => {});
   const [balance, setBalance] = useState(10);
   const [firstDimCount, setFirstDimCount] = useState(0);

   // if the component updates, replace the timeout callback with one that references the new
   //   values of `count` and `firstDimCount`

   timerExpiredCallback.current = () => {
      setBalance(balance + firstDimCount);
   };

   useEffect(() => {
      let timeID = -1;
      const startTimer = () => {
         timeID = setTimeout(() => {
            timerExpiredCallback.current();
            startTimer();
         }, 1000);
      };
      startTimer();

      // if we ever unmount / destroy this component instance, clear the timeout
      return () => clearTimeout(timeID);
   }, []);

   return (
      <div className='App'>
         <div className='score'>You have {balance} antimatters.</div>

         <Dimension balance={balance} firstDimCount={firstDimCount} setFirstDimCount={setFirstDimCount} setBalance={setBalance} factor={10} />
         <br></br>
      </div>
   );
}

export default App;
