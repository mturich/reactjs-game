import { useEffect, useRef } from 'react';
import { Dim, GameState } from '../common/GameStateInterface';
import { ACTIONS } from '../common/reducer';

export function useLocalStorage(gameState: GameState, dispatch: Function): void {
   //const saveLocStorageRef = useRef(-1);
   //const displayLocStorageRef = useRef(-1);

   // saves the created object every minuit to localStorage

   useEffect(() => {
      const saveDateRecursive = (gameState: GameState) => {
         if (Date.now() > gameState.lastSavedTime + 5 * 60 * 1000) {
            localStorage.setItem('data', JSON.stringify(gameState));
            console.log('data saved', gameState.lastSavedTime);
            dispatch({ type: ACTIONS.SAVE_DATA });
         }
      };
      saveDateRecursive(gameState);
   }, [gameState]);
}
