import { useState, useEffect, useRef } from 'react';
import './App.css';
import Dimension from './Dimension';

function App() {
   const timerExpiredCallback = useRef(() => {});
   const [balance, setBalance] = useState(100);
   const [firstDimCount, setFirstDimCount] = useState(0);
   const [secondDimCount, setSecondDimCount] = useState(0);
   // if the component updates, replace the timeout callback with one that references the new
   //   values of `count` and `firstDimCount`

   timerExpiredCallback.current = () => {
      setBalance(balance + firstDimCount + 10*secondDimCount);
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

         <Dimension balance={balance} dimCount={firstDimCount} setDimCount={setFirstDimCount} setBalance={setBalance} factor={10}>First Dim: 10</Dimension>

         <Dimension balance={balance} dimCount={secondDimCount} setDimCount={setSecondDimCount} setBalance={setBalance} factor={100}>Second Dim: 100</Dimension>
      </div>
   );
}

export default App;
