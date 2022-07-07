import { useEffect, useRef } from 'react';
import { GameState } from '../common/GameStateInterface';

export function useSaveToLocalStorage(gameState: GameState) {
   const saveLocStorageRef = useRef(-1);
   const displayLocStorageRef = useRef(-1);

   // saves the created object every minuit to localStorage
   useEffect(() => {
      const startSave = () => {
         saveLocStorageRef.current = setTimeout(() => {
            //localStorage.removeItem('dataRef');
            localStorage.setItem('data', JSON.stringify(gameState));
            console.log('data save cycle: ', gameState);
            startSave();
         }, 10000);
      };
      startSave();

      // if we ever unmount / destroy this component instance, clear the timeout
      return () => clearTimeout(saveLocStorageRef.current);
   }, []);

   // this prints the saved object from local storage. It is just for dev. No final purpose
   useEffect(() => {
      const printStorage = () => {
         displayLocStorageRef.current = setTimeout(() => {
            let savedDataRef = JSON.parse(localStorage.getItem('data') ?? '');
            console.log('dataRef from storage', savedDataRef);
            printStorage();
         }, 10000);
      };
      printStorage();

      return () => clearTimeout(displayLocStorageRef.current);
   }, []);
}
