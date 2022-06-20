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
   const clockSpeedRef = useRef(2000);
   const [tickspeedPrice, setTickspeedPrice] = useState(10);
   const [balance, setBalance] = useState(200);
   const [firstDimCount, setFirstDimCount] = useState(0);
   const [fistDimPrice, setFirstDimPrice] = useState(10);
   const [secondDimCount, setSecondDimCount] = useState(0);
   const [secondDimPrice, setSecondDimPrice] = useState(100)
   const [thirdDimCount, setThirdDimCount] = useState(0);
   const [thirdDimPrice, setThirdDimPrice] = useState(1000)
   // if the component updates, replace the timeout callback with one that references the new
   //   values of `count` and `firstDimCount`

   timerExpiredCallback.current = () => {
      setBalance(prevBalance => prevBalance + firstDimCount);
      setFirstDimCount(prevFirstDim => prevFirstDim + secondDimCount / 10);
      setSecondDimCount(prevSecondDim => prevSecondDim + thirdDimCount / 100);
   };

   useEffect(() => {
      let timeID = -1;
      const startTimer = () => {
         timeID = setTimeout(() => {
            timerExpiredCallback.current();
            startTimer();
         }, clockSpeedRef.current);
      };
      startTimer();

      // if we ever unmount / destroy this component instance, clear the timeout
      return () => clearTimeout(timeID);
   }, []);

   const handleTickBtnClick = () => {
      clockSpeedRef.current = clockSpeedRef.current * (1 - 0.11);
      setBalance(prevPrice => prevPrice - tickspeedPrice);
      setTickspeedPrice(prevPrice => prevPrice * 10);
   };

   return (
      <div className='App'>
         <div className='heading'>
            <p className='centered highlight'>
               You have {balance % 1 === 0 ? balance.toFixed(0) : balance.toFixed(1)} antimatters.
            </p>
         </div>

         <div className='gridContainer3Rows'>
            <p className='centered'>{`The current clockspeed is ${clockSpeedRef.current} ms. Reduce the tickspeed by 11%.`}</p>
            <div className='centered'>
               <button
                  className='btn centered'
                  onClick={handleTickBtnClick}
                  disabled={balance - tickspeedPrice <= 0}>
                  Cost of 1: {tickspeedPrice}{' '}
               </button>
               <button className='btn centered' disabled={balance - tickspeedPrice <= 0}>
                  Buy Max
               </button>
            </div>
         </div>

         <Dimension
            balance={balance}
            dimCount={firstDimCount}
            setDimCount={setFirstDimCount}
            setBalance={setBalance}
            price={fistDimPrice}
            setPrice={setFirstDimPrice}
         >
            {`1.Dim Cost: ${fistDimPrice}`}
         </Dimension>

         <Dimension
            balance={balance}
            dimCount={secondDimCount}
            setDimCount={setSecondDimCount}
            setBalance={setBalance}
            price={secondDimPrice}
            setPrice={setSecondDimPrice}>
            {`2.Dim Cost: ${secondDimPrice}`}
         </Dimension>

         {secondDimCount > 0 && (
            <Dimension
               balance={balance}
               dimCount={thirdDimCount}
               setDimCount={setThirdDimCount}
               setBalance={setBalance}
               price={thirdDimPrice}
               setPrice={setThirdDimPrice}>
               {`2.Dim Cost: ${thirdDimPrice}`}
            </Dimension>
         )}
      </div>
   );
}

export default App;
