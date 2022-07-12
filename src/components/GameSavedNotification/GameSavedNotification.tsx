import React, { useEffect, useState } from 'react';
import { GameState } from '../../common/GameStateInterface';
import { ACTIONS } from '../../common/reducer';
import '../../styles/GameSavedNotification.css';

export default function GameSavedNotification(gs: GameState, dispatch: Function) {
   let TIMER: number = 0;
   function handleTimeout() {
      TIMER = window.setTimeout(() => {
         dispatch({ type: ACTIONS.TOOGLE_GAME_NOTIFICATION_CLOSE });
      }, 3500);
   }

   useEffect(() => {
      if (Date.now() <= gs.lastSavedTime + 5) {
         dispatch({ type: ACTIONS.TOOGLE_GAME_NOTIFICATION_OPEN });
      }
   }, [gs.lastSavedTime]);

   useEffect(() => {
      console.log(gs.showGameSavedNotification);
   }, [gs.showGameSavedNotification]);

   useEffect(() => {
      if (gs.showGameSavedNotification) {
         handleTimeout();
      }
      return () => {
         clearTimeout(TIMER);
      };
   }, [gs.showGameSavedNotification, TIMER]);

   return (
      gs.showGameSavedNotification && (
         <div className='snackbar-overlay '>
            <div className='snackbar'>
               <div>Game saved !</div>
            </div>
         </div>
      )
   );
}
