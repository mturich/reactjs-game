import { useState, useEffect, useRef, useReducer } from 'react';
import '../styles/App.css';
import Dimension from './Dimention/Dimension';
import GameResets from './GameResetBtns/GameResets';
import Tickspeed from './Tickspeed/TickSpeed';
import DisplayAntimatter from './DisplayAntimatter/DisplayAntimatter';
import initialGameState from '../common/initialGameState';

import { useLocalStorage } from '../customeHooks/useLocalStorage';
import { ACTIONS, reducer } from '../common/reducer';
import GameSavedNotification from './GameSavedNotification/GameSavedNotification';

function App() {
   const [state, dispatch] = useReducer(
      reducer,
      JSON.parse(localStorage.getItem('data') || initialGameState)
   );
   const timerExpiredCallback = useRef(() => {});
   const tickspeedRef = useRef(2000);
   const timerIdRef = useRef(-1);
   useLocalStorage(state, dispatch);

   timerExpiredCallback.current = () => dispatch({ type: ACTIONS.TIMER_CALLBACK });

   useEffect(() => {
      const startTimer = () => {
         timerIdRef.current = window.setTimeout(() => {
            timerExpiredCallback.current();
            startTimer();
         }, tickspeedRef.current);
      };
      startTimer();

      // if we ever unmount / destroy this component instance, clear the timeout
      return () => clearTimeout(timerIdRef.current);
   }, []);

   return (
      <div className='App'>
         <DisplayAntimatter gameState={state} />

         <GameSavedNotification gs={state} dispatch={dispatch} />

         <Tickspeed
            gs={state} // gs = gamestate
            dispatch={dispatch}
            tickspeedRef={tickspeedRef}></Tickspeed>

         <Dimension nthDim={0} gs={state} dispatch={dispatch}>
            {`First Dimension Cost: ${state.dims[0].dimPrice}`}
         </Dimension>

         <Dimension nthDim={1} gs={state} dispatch={dispatch}>
            {`Second Dimension Cost: ${state.dims[1].dimPrice}`}
         </Dimension>
         {
            //the 3. dimension must be unlocked
         }
         {state.resetGameCounter > 2 && (
            <Dimension nthDim={2} gs={state} dispatch={dispatch}>
               {`Third Dimension Cost: ${state.dims[2].dimPrice}`}
            </Dimension>
         )}
         {state.resetGameCounter > 3 && (
            <Dimension nthDim={3} gs={state} dispatch={dispatch}>
               {`Forth Dimension Cost: ${state.dims[2].dimPrice}`}
            </Dimension>
         )}
         {state.resetGameCounter > 4 && (
            <Dimension nthDim={4} gs={state} dispatch={dispatch}>
               {`Fifth Dimension Cost: ${state.dims[2].dimPrice}`}
            </Dimension>
         )}
         {state.resetGameCounter > 5 && (
            <Dimension nthDim={5} gs={state} dispatch={dispatch}>
               {`Sixth Dimension Cost: ${state.dims[2].dimPrice}`}
            </Dimension>
         )}
         {state.resetGameCounter > 6 && (
            <Dimension nthDim={6} gs={state} dispatch={dispatch}>
               {`Seventh Dimension Cost: ${state.dims[2].dimPrice}`}
            </Dimension>
         )}
         {state.resetGameCounter > 7 && (
            <Dimension nthDim={8} gs={state} dispatch={dispatch}>
               {`Eight Dimension Cost: ${state.dims[2].dimPrice}`}
            </Dimension>
         )}

         <hr />
         <br />

         <GameResets gs={state} dispatch={dispatch}></GameResets>
      </div>
   );
}

export default App;
function clsx(arg0: any) {
   throw new Error('Function not implemented.');
}
