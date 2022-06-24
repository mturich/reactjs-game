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
   // tried to load the object data with the first opening of the page and then assign it to all the state but this was not sucessful. Loading ervery prop this way is very slow. CUrrently I do not know how to get the load data

   // the 2. thing I did not know how to do was the Buy max button. A while loop crashed the browser :( UPDATE: now it works with a recursion. are there better ways
   const dataRef = useRef(() => JSON.parse(localStorage.getItem('data')) ?? {});
   const canIstillBuyRef = useRef(0);
   const timerExpiredCallback = useRef(() => {});
   const clockSpeedRef = useRef(2000);
   const timerIdRef = useRef(-1);
   const idRef = useRef(-1);
   const timeIdRef = useRef(-1);

   // const dataRef = useRef({});
   const [tickspeedPrice, setTickspeedPrice] = useState(10);
   const [antimatter, setAntimatter] = useState(1000);
   const [resetGameCounter, setResetGameCounter] = useState(2);
   const [galaxyCounter, setGalaxyCounter] = useState(0);
   const [highesDim, setHighesDim] = useState(0);

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

   timerExpiredCallback.current = () => {
      setAntimatter(prevAntimatter => prevAntimatter + firstDimCount * firstDimFactor);
      setFirstDimCount(prevFirstDim => prevFirstDim + (secondDimCount / 10) * secondDimFactor);
      setSecondDimCount(prevSecondDim => prevSecondDim + (thirdDimCount / 100) * thirdDimFactor);
   };

   useEffect(() => {
      const startTimer = () => {
         timerIdRef.current = setTimeout(() => {
            timerExpiredCallback.current();
            startTimer();
         }, clockSpeedRef.current);
      };
      startTimer();

      // if we ever unmount / destroy this component instance, clear the timeout
      return () => clearTimeout(timerIdRef.current);
   }, []);

   //-------------------------------------------
   // FROM HERE

   const handleTickBtnClick = () => {
      clockSpeedRef.current = clockSpeedRef.current * (1 - 0.11);
      setAntimatter(prevPrice => prevPrice - tickspeedPrice);
      setTickspeedPrice(prevPrice => prevPrice * 10);
   };

   useEffect(() => {
      canIstillBuyRef.current = antimatter - tickspeedPrice;
   }, [tickspeedPrice]);

   /* ref is needed to get the current state */
   const canIstillBuy = () => {
      if (canIstillBuyRef.current > 0) return true;
      else return false;
   };

   /* It works but I do not know if there are better ways */
   const handleBuyMaxClick = () => {
      const repeatMax = () => {
         timeIdRef.current = setTimeout(() => {
            if (canIstillBuy()) {
               console.log(canIstillBuy(), canIstillBuyRef.current, tickspeedPrice);
               handleTickBtnClick();
               repeatMax();
            }
         }, 20);

         return () => clearTimeout(timeIdRef.current);
      };
      repeatMax();
   };

   // creates constantly an uptodate object which is then saved later
   useEffect(() => {
      dataRef.current = {
         // ...dataRef.current,
         antimatter,
         tickspeedPrice,
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
         resetGameCounter,
         highesDim,
         timerIdRef,
         idRef,
         clockSpeedRef,
      };
      //console.log('dataRef object update cycle: ', dataRef.current ?? '');
   });

   // saves the created object every minuit to localStorage
   useEffect(() => {
      const startSave = () => {
         timerIdRef.current = setTimeout(() => {
            //localStorage.removeItem('dataRef');
            localStorage.setItem('data', JSON.stringify(dataRef.current));
            console.log('data save cycle: ', dataRef.current);
            startSave();
         }, 60000);
      };
      startSave();

      // if we ever unmount / destroy this component instance, clear the timeout
      return () => clearTimeout(timerIdRef.current);
   }, []);

   // this prints the saved object from local storage. It is just for dev. No final purpose
   useEffect(() => {
      const printStorage = () => {
         idRef.current = setTimeout(() => {
            let savedDataRef = JSON.parse(localStorage.getItem('data') ?? '');
            console.log('dataRef from storage', savedDataRef);
            printStorage();
         }, 60000);
      };
      printStorage();

      return () => clearTimeout(idRef.current);
   }, []);

   /* resets the game to unlock new dimension */
   const handleResetGameClick = () => {
      clockSpeedRef.current = 2000;
      timerIdRef.current = -1;
      idRef.current = -1;

      setTickspeedPrice(10);
      setAntimatter(1000);

      setFirstDimFactor(1.1);
      setFirstDimCount(0);
      setFirstDimPrice(10);
      setFirstDimFactorCount(0);

      setSecondDimFactor(1.1);
      setSecondDimCount(0);
      setSecondDimPrice(100);
      setSecondDimFactorCount(0);

      setThirdDimFactor(1.1);
      setThirdDimCount(0);
      setThirdDimPrice(1000);
      setThirdDimFactorCount(0);

      // increase ResetCounter by one
      setResetGameCounter(prev => prev + 1);
   };
   /*   saves the current DimCount of the highes Dim */
   useEffect(() => {
      /* higher dims have to be added when created */
      if (thirdDimCount !== 0) setHighesDim(thirdDimCount);
      else setHighesDim(secondDimCount);
   }, [secondDimCount, thirdDimCount]);

   //---------------------------------------------------

   return (
      <div className='App'>
         <div className='heading'>
            <p className='centered highlight'>
               You have {antimatter % 1 === 0 ? antimatter.toFixed(0) : antimatter.toFixed(1)}{' '}
               antimatters.
            </p>
         </div>

         <div className='gridContainer3Rows'>
            <p className='centered'>{`The current clockspeed is ${clockSpeedRef.current.toFixed(
               0
            )} ms. Reduce the tickspeed by 11%.`}</p>
            <div className='centered'>
               <button
                  className='btn'
                  onClick={handleTickBtnClick}
                  disabled={antimatter - tickspeedPrice <= 0}>
                  Cost one time: {tickspeedPrice}{' '}
               </button>
               <button
                  className='btn'
                  onClick={handleBuyMaxClick}
                  disabled={antimatter - tickspeedPrice <= 0}>
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
         {/* the 3. dimension must be unlocked */}
         {resetGameCounter > 2 && (
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

            /* Here have to come all the other dims  */
         )}
         <hr />
         <br />
         <div className='gridContainer4Cols cols-2'>
            <p className=''>{`Dimension Shift (${resetGameCounter})  `}</p>
            <p className=''>{`requires 20 ${resetGameCounter}. Dimension `}</p>
            <button className='btn ' onClick={handleResetGameClick} disabled={highesDim < 20}>
               Reset game to get new dimension
            </button>
         </div>
         <div className='gridContainer4Cols cols-2'>
            <p className=''>{`Antimatter Galaxies (${galaxyCounter})`}</p>
            <p className=''>{`requires 80 8. Dimension `}</p>
            <button className='btn' disabled={true}>
               Increase Tickspeed bump to 12%
            </button>
         </div>
      </div>
   );
}

export default App;
