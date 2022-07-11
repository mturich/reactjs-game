import { useRef, useEffect, useState } from 'react';
import { GameState } from '../../common/GameStateInterface';
import { getCostForPurchaseQty } from './getCostForPurchaseQty';
import { calcMaxPurchasableQty } from './calcMaxPurchasableQty';

export default function Tickspeed(props: {
   gameState: GameState;
   setGameState: Function;
   tickspeedRef: any;
}) {
   const { gameState, setGameState, tickspeedRef } = props;
   const [buyMax, setBuyMax] = useState(
      Math.log10(gameState.antimatter / gameState.tickspeedPrice)
   );

   // calculte the maximal purchasable
   const maxPurchaseQtys = calcMaxPurchasableQty({
      cost: gameState.tickspeedPrice,
      balance: gameState.antimatter,
      qty: 0,
   });
   const purchasePrice = getCostForPurchaseQty(gameState.tickspeedPrice, maxPurchaseQtys);
   
   const handleTickBtnClick = () => {
      tickspeedRef.current = tickspeedRef.current * (1 - gameState.tickspeedDeceaseRate);
      setGameState((prevGS: GameState) => ({
         ...prevGS,
         antimatter: prevGS.antimatter - prevGS.tickspeedPrice,
         tickspeedPrice: prevGS.tickspeedPrice * 10,
      }));
   };
   const handleBuyMaxClick = () => {
      tickspeedRef.current =
         tickspeedRef.current * (1 - gameState.tickspeedDeceaseRate) ** maxPurchaseQtys;
      setGameState((prevGS: GameState) => ({
         ...prevGS,
         antimatter: prevGS.antimatter - purchasePrice,
         tickspeedPrice: prevGS.tickspeedPrice * 10 ** maxPurchaseQtys,
      }));
   };

   return (
      <div className='gridContainer3Rows'>
         <p className='centered'>{`The current clockspeed is ${tickspeedRef.current.toFixed(
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
               Buy Max ({maxPurchaseQtys})
            </button>
         </div>
      </div>
   );
}
