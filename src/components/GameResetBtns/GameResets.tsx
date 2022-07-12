import { useEffect, useRef, useState } from 'react';
import { GameState } from '../../common/GameStateInterface';
import initialGameState from '../../common/initialGameState';
import { ACTIONS } from '../../common/reducer';

export default function GameResets(props: { gs: GameState; dispatch: Function }) {
   const { gs, dispatch } = props;
   const [popUp, setPopUp] = useState(false);
   const resetGameCounterRef = useRef(gs.resetGameCounter);

   useEffect(() => {
      resetGameCounterRef.current = gs.resetGameCounter;
   }, [gs.resetGameCounter]);

   const handleResetGameClick = () => {
      dispatch({ type: ACTIONS.RESET_TO_UNLOCK_DIM });
   };

   const handleGalaxyBtn = () => {
      dispatch({ type: ACTIONS.RESET_TO_UNLOCK_TICKSPEED });
   };

   const disableResetBtn = () => {
      if (gs.resetGameCounter < 7 && gs.dims[gs.resetGameCounter - 1].dimCount < 20) return true;
      else return false;
   };

   return (
      <>
         <div className='gridContainer4Cols cols-2'>
            <p className=''>{`Dimension Shift (${gs.resetGameCounter})  `}</p>
            <p className=''>{`requires 20 ${gs.resetGameCounter}. Dimension `}</p>
            <button
               className='btn '
               onClick={handleResetGameClick}
               disabled={gs.resetGameCounter > 7 || gs.dims[gs.resetGameCounter - 1].dimCount < 20}>
               Reset game to get new dimension
            </button>
         </div>
         <div className='gridContainer4Cols cols-2'>
            <p className=''>{`Antimatter Galaxies (${gs.galaxyCounter})`}</p>
            <p className=''>{`requires 80 8. Dimension `}</p>
            <button className='btn' onClick={handleGalaxyBtn} disabled={gs.dims[8].dimCount < 80}>
               Increase Tickspeed by 10%
            </button>
         </div>
         <div className='gridContainer4Cols cols-2'>
            <p className=''>{`reset game`}</p>
            <p className=''>{`resets everything`}</p>
            <button
               className='btn'
               onClick={() => setPopUp(true)}
               //onClick={() => dispatch({ type: ACTIONS.RESET_TO_INITIAL_VALUES })}
               disabled={false}>
               Resets game
            </button>
         </div>
         {popUp && (
            <div className=' overlay black'>
               <div className='pop-up centered spaceAround'>
                  <button
                     className='btn red'
                     onClick={() => {
                        setPopUp(false);
                        return dispatch({ type: ACTIONS.RESET_TO_INITIAL_VALUES });
                     }}>
                     Reset game! All data is lost!
                  </button>
                  <button className='btn' onClick={() => setPopUp(false)}>
                     Cancel
                  </button>
               </div>
            </div>
         )}
      </>
   );
}
