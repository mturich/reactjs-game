import { useState, useEffect, useRef, useReducer } from 'react';
import '../styles/App.css';
import Dimension from './Dimention/Dimension';
import GameResets from './GameResetBtns/GameResets';
import Tickspeed from './Tickspeed/TickSpeed';
import DisplayAntimatter from './DisplayAntimatter/DisplayAntimatter';
import initialGameState from '../common/initialGameState';

import { GameState, Dim } from '../common/GameStateInterface';
import { useLocalStorage } from '../customeHooks/useLocalStorage';

export const ACTIONS = {
   TIMER_CALLBACK: 'TIMER_CALLBACK',
   UPDATE_DIM: 'UPDATE_DIM',
   UPDATE_10TH_DIM: 'UPDATE_10TH_DIM',
};

function reducer(state: GameState, action: { type: string; payload?: any }) {
   switch (action.type) {
      case ACTIONS.TIMER_CALLBACK:
         return {
            ...state,
            antimatter: state.antimatter + state.dims[0].dimCount * state.dims[0].dimFactor,
            dims: state.dims.map((dim: Dim, index: number) => {
               return {
                  ...dim,
                  dimCount:
                     dim.dimCount +
                     ((state.dims[index + 1]?.dimCount ?? 0) *
                        (state.dims[index + 1]?.dimFactor ?? 0)) /
                        Math.pow(10, index + 1),
               };
            }),
         };
      case ACTIONS.UPDATE_DIM:
         return {
            ...state,
            antimatter:
               state.antimatter -
               state.dims[action.payload.nthDim].dimPrice * action.payload.quantity,
            dims: state.dims.map((dim: Dim) => {
               if (dim.nthDim !== action.payload.nthDim) return dim;
               return {
                  ...dim,
                  dimCount: dim.dimCount + action.payload.quantity,
                  dimFactorCount: dim.dimFactorCount + action.payload.quantity,
               };
            }),
         };
      case ACTIONS.UPDATE_10TH_DIM:
         return {
            ...state,
            dims: state.dims.map((dim: Dim) => {
               if (dim.nthDim !== action.payload.nthDim) return dim;
               return {
                  ...dim,
                  dimPrice: dim.dimPrice * 10,
                  dimFactor: dim.dimFactor * 2,
                  dimFactorCount: 0,
               };
            }),
         };
      default:
         return state;
   }
}

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
         timerIdRef.current = setTimeout(() => {
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
         {/* 
         <Tickspeed
            gameState={state}
            dispatch={dispatch}
            tickspeedRef={tickspeedRef}></Tickspeed> */}

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

         {/* <GameResets gameState={state} dispatch={dispatch}></GameResets> */}
      </div>
   );
}

export default App;
