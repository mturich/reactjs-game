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
   // const maxPossibleBuys = useRef(~~Math.log10(gameState.antimatter / gameState.tickspeedPrice));
   const handleTickBtnClick = () => {
      clockSpeedRef.current = clockSpeedRef.current * (1 - gameState.tickspeedDeceaseRate);
      setGameState((prevGS: GameState) => ({
         ...prevGS,
         antimatter: prevGS.antimatter - prevGS.tickspeedPrice,
         tickspeedPrice: prevGS.tickspeedPrice * 10,
      }));
   };

   const getMaxPurchaseQtyRecursive = (price: number, antimatter: number, quantity = 0): number => {
      if (antimatter < price) {
         return quantity
      } else {
         return getMaxPurchaseQtyRecursive(price * 10, antimatter - price, quantity + 1);
      }
   };

   const maxPurchasableQuantity = getMaxPurchaseQtyRecursive(
      gameState.tickspeedPrice,
      gameState.antimatter,
      0
   );

   const getCostForPurchaseQty = (firstCost: number, quantity: number): number => {
      if (quantity == 1) {
         return firstCost;
      } else {
         return firstCost + getCostForPurchaseQty(firstCost * 10, quantity - 1); 
      } 
   }

   const handleBuyMaxClick = () => {
      clockSpeedRef.current = clockSpeedRef.current * (1 - gameState.tickspeedDeceaseRate) ** maxPurchasableQuantity;
      setGameState((prevGS: GameState) => ({
         ...prevGS,
         antimatter: prevGS.antimatter - getCostForPurchaseQty(maxPurchasableQuantity, prevGS.tickspeedPrice),
         tickspeedPrice: prevGS.tickspeedPrice * 10 ** maxPurchasableQuantity,
      }));
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
               Buy Max ({maxPurchasableQuantity})
            </button>
         </div>
      </div>
   );
}
