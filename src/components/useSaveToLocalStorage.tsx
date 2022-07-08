import { useEffect, useRef } from 'react';
import { Dim, GameState } from '../common/GameStateInterface';

export function useSaveToLocalStorage(gameState: GameState, setGameState) {
   const saveLocStorageRef = useRef(-1);
   const displayLocStorageRef = useRef(-1);

   // saves the created object every minuit to localStorage

   useEffect(() => {
      const saveDateRecursive = (gameState: GameState) => {
         if (Date.now() > gameState.lastSavedTime + 60 * 1000) {
            localStorage.setItem('data', JSON.stringify(gameState));
            console.log('data saved', gameState.lastSavedTime);
            setGameState((prevGS: GameState) => ({
               ...prevGS,
               lastSavedTime: Date.now(),
            }));
         }
      };
      saveDateRecursive(gameState);

   }, [gameState]);

   // this prints the saved object from local storage. It is just for dev. No final purpose
   /*  useEffect(() => {
      const printStorage = () => {
         displayLocStorageRef.current = setTimeout(() => {
            let savedData= JSON.parse(localStorage.getItem('data') ?? '');
            console.log('dataRef from storage', savedData);
            printStorage();
         }, 10000);
      };
      printStorage();

      return () => clearTimeout(displayLocStorageRef.current);
   }, []); */
}
