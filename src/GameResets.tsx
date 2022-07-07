import React from 'react';
import initialGameState from './common/initialGameState';

export default function GameResets(props: { gameState: any; setGameState: any; }) {

   const {gameState, setGameState} = props;

   const handleResetGameClick = () => {
      setGameState(JSON.parse(initialGameState));
   };

return (
   <>
      <div className='gridContainer4Cols cols-2'>
         <p className=''>{`Dimension Shift (${gameState.resetGameCounter})  `}</p>
         <p className=''>{`requires 20 ${gameState.resetGameCounter}. Dimension `}</p>
         <button
            className='btn '
            onClick={handleResetGameClick}
            disabled={gameState.dims[gameState.resetGameCounter - 1].dimCount <= 20}>
            Reset game to get new dimension
         </button>
      </div>
      <div className='gridContainer4Cols cols-2'>
         <p className=''>{`Antimatter Galaxies (${gameState.galaxyCounter})`}</p>
         <p className=''>{`requires 80 8. Dimension `}</p>
         <button className='btn' disabled={true}>
            Increase Tickspeed bump to 12%
         </button>
      </div>
   </>
);
}