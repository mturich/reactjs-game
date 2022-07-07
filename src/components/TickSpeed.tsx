import { useRef, useEffect, useState } from 'react';
import { GameState } from '../common/GameStateInterface';

export default function Tickspeed(props: {
   gameState: GameState;
   setGameState: any;
   clockSpeedRef: any;
}) {
   const { gameState, setGameState, clockSpeedRef } = props;
   const [buyMax, setBuyMax] = useState(
      Math.log10(gameState.antimatter / gameState.tickspeedPrice)
   );
   const maxPossibleBuys = useRef(~~Math.log10(gameState.antimatter / gameState.tickspeedPrice));
   const handleTickBtnClick = () => {
      clockSpeedRef.current = clockSpeedRef.current * (1 - gameState.tickspeedDeceaseRate);
      setGameState((prevGS: GameState) => ({
         ...prevGS,
         antimatter: prevGS.antimatter - prevGS.tickspeedPrice,
         tickspeedPrice: prevGS.tickspeedPrice * 10,
      }));
   };

   useEffect(() => {
      const getCostForPurchaseQtyRecursive = (price: number, antimatter: number, quantity = 0) => {
         if (antimatter < price) {
            return quantity;
         } else {
            return getCostForPurchaseQtyRecursive(price * 10, antimatter - price, quantity + 1);
         }
      };

      maxPossibleBuys.current = getCostForPurchaseQtyRecursive(
         gameState.tickspeedPrice,
         gameState.antimatter,
         0
      );
   }, [gameState]);

   const handleBuyMaxClick = () => {
      for (let i = 0; i < maxPossibleBuys.current; i++) {
         handleTickBtnClick();
      }
   };

   return (
      <div className='gridContainer3Rows'>
         <p className='centered'>{`The current clockspeed is ${clockSpeedRef.current.toFixed(
            0
         )} ms. Reduce the tickspeed by ${gameState.tickspeedDeceaseRate * 100}%.`}</p>
         <div className='centered'>
            <button
               className='btn'
               onClick={handleTickBtnClick}
               disabled={gameState.antimatter - gameState.tickspeedPrice <= 0}>
               Cost one time: {gameState.tickspeedPrice}{' '}
            </button>
            <button
               className='btn'
               onClick={handleBuyMaxClick}
               disabled={gameState.antimatter < gameState.tickspeedPrice}>
               Buy Max ({maxPossibleBuys.current})
            </button>
         </div>
      </div>
   );
}
