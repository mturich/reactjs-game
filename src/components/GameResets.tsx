import initialGameState from '../common/initialGameState';

export default function GameResets(props: { gameState: any; setGameState: any }) {
   const { gameState, setGameState } = props;

   const handleResetGameClick = () => {
      setGameState(() => JSON.parse(initialGameState));
   };

   const handleTickDecreseBtn = () => {
      setGameState(() => ({
         ...JSON.parse(initialGameState),
         tickspeedDeceaseRate: 0.12,
      }));
   };

   return (
      <>
         <div className='gridContainer4Cols cols-2'>
            <p className=''>{`Dimension Shift (${gameState.resetGameCounter})  `}</p>
            <p className=''>{`requires 20 ${gameState.resetGameCounter}. Dimension `}</p>
            <button
               className='btn '
               onClick={handleResetGameClick}
               disabled={gameState.dims[gameState.resetGameCounter - 1].dimCount < 20}>
               Reset game to get new dimension
            </button>
         </div>
         <div className='gridContainer4Cols cols-2'>
            <p className=''>{`Antimatter Galaxies (${gameState.galaxyCounter})`}</p>
            <p className=''>{`requires 80 8. Dimension `}</p>
            <button
               className='btn'
               onClick={handleTickDecreseBtn}
               disabled={gameState.dims[7].dimCount < 80}>
               Increase Tickspeed bump to 12%
            </button>
         </div>
      </>
   );
}
