import { useState, useEffect, useRef } from 'react';
import '../styles/App.css';
import Dimension from './Dimension';
import GameResets from './GameResets';
import Tickspeed from './TickSpeed';

import { GameState, Dim } from '../common/GameStateInterface';
import initialGameState from '../common/initialGameState';
import DisplayAntimatter from './DisplayAntimatter';
import { useSaveToLocalStorage } from './useSaveToLocalStorage';

function App() {
   const [gameState, setGameState] = useState(() => JSON.parse(initialGameState));
   /*  JSON.parse(localStorage.getItem('data')) */
   const timerExpiredCallback = useRef(() => {});
   const clockSpeedRef = useRef(2000);
   const timerIdRef = useRef(-1);
   //useSaveToLocalStorage(gameState)

   timerExpiredCallback.current = () => {
      setGameState((prevGS: GameState) => ({
         ...prevGS,
         antimatter: prevGS.antimatter + prevGS.dims[0].dimCount * prevGS.dims[0].dimFactor,
         dims: gameState.dims.map((dim: Dim, index: number) => {
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

   return (
      <div className='App'>
  
         <DisplayAntimatter gameState={gameState}/>

         <Tickspeed
            gameState={gameState}
            setGameState={setGameState}
            clockSpeedRef={clockSpeedRef}></Tickspeed>

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
