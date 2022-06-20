import { useState, useEffect, useRef } from 'react';
import './App.css';
import Dimension from './Dimension';


type DimProps = {
   balance: number;
   dimCount: number;
   setDimCount: (fn: (dim: number) => void) => void;
   setBalance: (fn: ((balance: number) => void) | number) => void;
   price: number;

};

function App() {
   const timerExpiredCallback = useRef(() => {});
   const [balance, setBalance] = useState(100);
   const [clockSpeed, setClockSpeed] = useState(2000)
   const [firstDimCount, setFirstDimCount] = useState(0);
   const [secondDimCount, setSecondDimCount] = useState(0);
   const [thirdDimCount, setThirdDimCount] = useState(0);
   // if the component updates, replace the timeout callback with one that references the new
   //   values of `count` and `firstDimCount`

   timerExpiredCallback.current = () => {
      setBalance(prevBalance => prevBalance + firstDimCount);
      setFirstDimCount(prevFirstDim => prevFirstDim + secondDimCount / 10);
      setSecondDimCount(prevSecondDim => prevSecondDim + thirdDimCount / 100);
   };

   useEffect(() => {
      // console.log(firstDimCount, secondDimCount, thirdDimCount);
   });

   useEffect(() => {
      let timeID = -1;
      const startTimer = () => {
         timeID = setTimeout(() => {
            timerExpiredCallback.current();
            startTimer();
         }, 2000);
      };
      startTimer();

      // if we ever unmount / destroy this component instance, clear the timeout
      return () => clearTimeout(timeID);
   }, []);

   return (
      <div className='App'>
         <div className='heading'>
            <p className='centered highlight'>
               You have {balance % 1 === 0 ? balance.toFixed(0) : balance.toFixed(1)} antimatters.
            </p>
         </div>
         
         <Dimension
            balance={balance}
            dimCount={firstDimCount}
            setDimCount={setFirstDimCount}
            setBalance={setBalance}
            price={10}>
            First Dim
         </Dimension>

         <Dimension
            balance={balance}
            dimCount={secondDimCount}
            setDimCount={setSecondDimCount}
            setBalance={setBalance}
            price={100}>
            Second Dim
         </Dimension>

         {secondDimCount > 0 && (
            <Dimension
               balance={balance}
               dimCount={thirdDimCount}
               setDimCount={setThirdDimCount}
               setBalance={setBalance}
               price={1000}>
               Third Dim
            </Dimension>
         )}
      </div>
   );
}

export default App;
