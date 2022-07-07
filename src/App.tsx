import { useState, useEffect, useRef } from 'react';
import './App.css';
import Dimension from './Dimension';
import initialGameState from './common/initialGameState';
import { GameState, Dim } from './common/GameStateInterface';
import GameResets from './GameResets';

function App() {
   const [gameState, setGameState] = useState(() => JSON.parse(initialGameState));
   /*  JSON.parse(localStorage.getItem('data')) */
   const canIstillBuyRef = useRef(0);
   const timerExpiredCallback = useRef(() => {});
   const clockSpeedRef = useRef(2000);
   const timerIdRef = useRef(-1);
   const timeIdRef = useRef(-1);

   timerExpiredCallback.current = () => {
      setGameState((prevGS: GameState) => ({
         ...prevGS,
         antimatter: prevGS.antimatter + prevGS.dims[0].dimCount * prevGS.dims[0].dimFactor,
         dims: gameState.dims.map((dim:Dim, index:number) => {
            return {
               ...dim,
               dimCount:
                  dim.dimCount +
                  ((gameState.dims[index + 1]?.dimCount ?? 0) *
                     (gameState.dims[index + 1]?.dimFactor ?? 0)) /
                     Math.pow(10, index + 1),
            };
         }),
      }));
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
      clockSpeedRef.current = clockSpeedRef.current * (1 - gameState.tickspeedDeceaseRate);
      setGameState((prevGS: GameState) => ({
         ...prevGS,
         antimatter: prevGS.antimatter - prevGS.tickspeedPrice,
         tickspeedPrice: prevGS.tickspeedPrice * 10,
      }));
   };

   useEffect(() => {
      canIstillBuyRef.current = gameState.antimatter - gameState.tickspeedPrice;
   }, [gameState.tickspeedPrice]);

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
               console.log(canIstillBuy(), canIstillBuyRef.current, gameState.tickspeedPrice);
               handleTickBtnClick();
               repeatMax();
            }
         }, 20);

         return () => clearTimeout(timeIdRef.current);
      };
      repeatMax();
   };

   /*   // creates constantly an uptodate object which is then saved later

   // saves the created object every minuit to localStorage
   useEffect(() => {
      const startSave = () => {
         timerIdRef.current = setTimeout(() => {
            //localStorage.removeItem('dataRef');
            localStorage.setItem('data', JSON.stringify(gameState));
            console.log('data save cycle: ', gameState);
            startSave();
         }, 10000);
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
 */

   //---------------------------------------------------

   return (
      <div className='App'>
         <div className='heading'>
            <p className='centered highlight'>
               You have{' '}
               {gameState.antimatter % 1 === 0
                  ? gameState.antimatter.toFixed(0)
                  : gameState.antimatter.toFixed(1)}{' '}
               antimatters.
            </p>
         </div>

         <div className='gridContainer3Rows'>
            <p className='centered'>{`The current clockspeed is ${clockSpeedRef.current.toFixed(
               0
            )} ms. Reduce the tickspeed by ${gameState.tickspeedDeceaseRate*100}%.`}</p>
            <div className='centered'>
               <button
                  className='btn'
                  onClick={handleTickBtnClick}
                  disabled={gameState.antimatter - gameState.tickspeedPrice <= 0}>
                  Cost one time: {gameState.tickspeedPrice}{' '}
               </button>
               <button
                  className='btn'
                  onClick={handleBuyMaxClick}
                  disabled={gameState.antimatter - gameState.tickspeedPrice <= 0}>
                  Buy Max
               </button>
            </div>
         </div>

         <Dimension nthDim={0} gs={gameState} setGameState={setGameState}>
            {`First Dimension Cost: ${gameState.dims[0].dimPrice}`}
         </Dimension>

         <Dimension nthDim={1} gs={gameState} setGameState={setGameState}>
            {`Second Dimension Cost: ${gameState.dims[1].dimPrice}`}
         </Dimension>
         {
            //the 3. dimension must be unlocked
         }
         {gameState.resetGameCounter > 2 && (
            <Dimension nthDim={2} gs={gameState} setGameState={setGameState}>
               {`Third Dimension Cost: ${gameState.dims[2].dimPrice}`}
            </Dimension>

            // Here have to come all the other dims
         )}

         <hr />
         <br />

         <GameResets gameState={gameState} setGameState={setGameState}></GameResets>
      </div>
   );
}

export default App;
