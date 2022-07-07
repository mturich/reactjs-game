import { GameState } from '../common/GameStateInterface';

export default function DisplayAntimatter(props: { gameState: GameState }) {
   const { gameState } = props;

   return (
      <div className='heading'>
         <p className='centered highlight'>
            You have{' '}
            {gameState.antimatter % 1 === 0
               ? gameState.antimatter.toFixed(0)
               : gameState.antimatter.toFixed(1)}{' '}
            antimatters.
         </p>
      </div>
   );
}
