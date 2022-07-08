import { useEffect, useRef } from 'react';
import { GameState } from '../common/GameStateInterface';
import initialGameState from '../common/initialGameState';

export default function GameResets(props: { gameState: GameState; setGameState: any }) {
   const { gameState, setGameState } = props;
   const resetGameCounterRef = useRef(gameState.resetGameCounter);

   useEffect(() => {
      resetGameCounterRef.current = gameState.resetGameCounter;
   }, [gameState.resetGameCounter]);

   const handleResetGameClick = () => {
      setGameState((prevGS: GameState) => ({
         ...JSON.parse(initialGameState),
         galaxyCounter: prevGS.galaxyCounter,
         resetGameCounter: prevGS.resetGameCounter + 1,
         lastSavedTime: prevGS.lastSavedTime,
      }));
   };

   const handleGalaxyBtn = () => {
      setGameState((prevGS: GameState) => ({
         ...JSON.parse(initialGameState),
         galaxyCounter: prevGS.galaxyCounter + 1,
         tickspeedDeceaseRate: 0.12,
         resetGameCounter: prevGS.resetGameCounter,
         lastSavedTime: prevGS.lastSavedTime,
      }));
   };

   const disableResetBtn = () => {
      if (
         gameState.resetGameCounter < 7 &&
         gameState.dims[gameState.resetGameCounter - 1].dimCount < 20
      )
         return true;
      else return false;
   };

   return (
      <>
         <div className='gridContainer4Cols cols-2'>
            <p className=''>{`Dimension Shift (${gameState.resetGameCounter})  `}</p>
            <p className=''>{`requires 20 ${gameState.resetGameCounter}. Dimension `}</p>
            <button className='btn ' onClick={handleResetGameClick} disabled={(gameState.resetGameCounter < 7 &&
         gameState.dims[gameState.resetGameCounter - 1].dimCount < 20) ? true : false}>
               Reset game to get new dimension
            </button>
         </div>
         <div className='gridContainer4Cols cols-2'>
            <p className=''>{`Antimatter Galaxies (${gameState.galaxyCounter})`}</p>
            <p className=''>{`requires 80 8. Dimension `}</p>
            <button
               className='btn'
               onClick={handleGalaxyBtn}
               disabled={gameState.dims[7].dimCount < 80}>
               Increase Tickspeed bump to 12%
            </button>
         </div>
         <div className='gridContainer4Cols cols-2'>
            <p className=''>{`reset game`}</p>
            <p className=''>{`resets everything`}</p>
            <button
               className='btn'
               onClick={() => setGameState(JSON.parse(initialGameState))}
               disabled={false}>
               Resets game
            </button>
         </div>
      </>
   );
}
