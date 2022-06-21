import { useState, useEffect, useRef } from 'react';
import './App.css';
import Dimension from './Dimension';

type DimProps = {
   antimatter: number;
   dimCount: number;
   setDimCount: (fn: (dim: number) => void) => void;
   setAntimatter: (fn: ((antimatter: number) => void) | number) => void;
   price: number;
};

function App() {
   const timerExpiredCallback = useRef(() => {});
   const clockSpeedRef = useRef(2000);
   const timerId = useRef(-1);
   const toSaveId = useRef(-1);
   const [tickspeedPrice, setTickspeedPrice] = useState(10);
   const [antimatter, setAntimatter] = useState(200);

   const [firstDimFactor, setFirstDimFactor] = useState(1.1);
   const [firstDimCount, setFirstDimCount] = useState(0);
   const [firstDimPrice, setFirstDimPrice] = useState(10);
   const [firstDimFactorCount, setFirstDimFactorCount] = useState(0);

   const [secondDimFactor, setSecondDimFactor] = useState(1.1);
   const [secondDimCount, setSecondDimCount] = useState(0);
   const [secondDimPrice, setSecondDimPrice] = useState(100);
   const [secondDimFactorCount, setSecondDimFactorCount] = useState(0);

   const [thirdDimFactor, setThirdDimFactor] = useState(1.1);
   const [thirdDimCount, setThirdDimCount] = useState(0);
   const [thirdDimPrice, setThirdDimPrice] = useState(1000);
   const [thirdDimFactorCount, setThirdDimFactorCount] = useState(0);
   // if the component updates, replace the timeout callback with one that references the new
   //   values of `count` and `firstDimCount`

   useEffect(() => {
      const startSave = () => {
         timerId.current = setTimeout(() => {
            const toSave = {
               timerId,
               clockSpeedRef,
               tickspeedPrice,
               antimatter,
               firstDimCount,
               firstDimFactor,
               firstDimPrice,
               firstDimFactorCount,
               secondDimCount,
               secondDimFactor,
               secondDimPrice,
               secondDimFactorCount,
               thirdDimCount,
               thirdDimFactor,
               thirdDimPrice,
               thirdDimFactorCount,
            };
            console.log(toSave);
            //localStorage.setItem("data", JSON.stringify(toSave));
            startSave();
         }, 5 * 60 * 1000);
      };
      startSave();

      // if we ever unmount / destroy this component instance, clear the timeout
      return () => clearTimeout(timerId.current);
   }, []);

   timerExpiredCallback.current = () => {
      setAntimatter(prevantimatter => prevantimatter + firstDimCount * firstDimFactor);
      setFirstDimCount(prevFirstDim => prevFirstDim + (secondDimCount / 10) * secondDimFactor);
      setSecondDimCount(prevSecondDim => prevSecondDim + (thirdDimCount / 100) * thirdDimFactor);
   };

   useEffect(() => {
      const startTimer = () => {
         timerId.current = setTimeout(() => {
            timerExpiredCallback.current();
            startTimer();
         }, clockSpeedRef.current);
      };
      startTimer();

      // if we ever unmount / destroy this component instance, clear the timeout
      return () => clearTimeout(timerId.current);
   }, []);

   const handleTickBtnClick = () => {
      clockSpeedRef.current = clockSpeedRef.current * (1 - 0.11);
      setAntimatter(prevPrice => prevPrice - tickspeedPrice);
      setTickspeedPrice(prevPrice => prevPrice * 10);
   };

   return (
      <div className='App'>
         <div className='heading'>
            <p className='centered highlight'>
               You have {antimatter % 1 === 0 ? antimatter.toFixed(0) : antimatter.toFixed(1)}{' '}
               antimatters.
            </p>
         </div>

         <div className='gridContainer3Rows'>
            <p className='centered'>{`The current clockspeed is ${clockSpeedRef.current} ms. Reduce the tickspeed by 11%.`}</p>
            <div className='centered'>
               <button
                  className='btn centered'
                  onClick={handleTickBtnClick}
                  disabled={antimatter - tickspeedPrice <= 0}>
                  Cost one time: {tickspeedPrice}{' '}
               </button>
               <button className='btn centered' disabled={antimatter - tickspeedPrice <= 0}>
                  Buy Max
               </button>
            </div>
         </div>

         <Dimension
            antimatter={antimatter}
            dimCount={firstDimCount}
            setDimCount={setFirstDimCount}
            setAntimatter={setAntimatter}
            price={firstDimPrice}
            setPrice={setFirstDimPrice}
            factor={firstDimFactor}
            setFactor={setFirstDimFactor}
            dimFactorCount={firstDimFactorCount}
            setDimFactorCount={setFirstDimFactorCount}>
            {`First Dimension Cost: ${firstDimPrice}`}
         </Dimension>

         <Dimension
            antimatter={antimatter}
            dimCount={secondDimCount}
            setDimCount={setSecondDimCount}
            setAntimatter={setAntimatter}
            price={secondDimPrice}
            setPrice={setSecondDimPrice}
            factor={secondDimFactor}
            setFactor={setSecondDimFactor}
            dimFactorCount={secondDimFactorCount}
            setDimFactorCount={setSecondDimFactorCount}>
            {`Second Dimension Cost: ${secondDimPrice}`}
         </Dimension>

         {secondDimCount > 0 && (
            <Dimension
               antimatter={antimatter}
               dimCount={thirdDimCount}
               setDimCount={setThirdDimCount}
               setAntimatter={setAntimatter}
               price={thirdDimPrice}
               setPrice={setThirdDimPrice}
               factor={thirdDimFactor}
               setFactor={setThirdDimFactor}
               dimFactorCount={thirdDimFactorCount}
               setDimFactorCount={setThirdDimFactorCount}>
               {`Third Dimension Cost: ${thirdDimPrice}`}
            </Dimension>
         )}
      </div>
   );
}

export default App;
