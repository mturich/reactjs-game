import { useState } from 'react';
import { GameState } from '../../common/GameStateInterface';
import { getCostForPurchaseQty } from './getCostForPurchaseQty';
import { calcMaxPurchasableQty } from './calcMaxPurchasableQty';
import { ACTIONS } from '../../common/reducer';

export default function Tickspeed(props: { gs: GameState; dispatch: Function; tickspeedRef: any }) {
   const { gs, dispatch, tickspeedRef } = props;

   // calculte the maximal purchasable
   const maxPurchaseQtys = calcMaxPurchasableQty({
      cost: gs.tickspeedPrice,
      balance: gs.antimatter,
      qty: 0,
   });
   const purchasePrice = getCostForPurchaseQty(gs.tickspeedPrice, maxPurchaseQtys);

   const handleTickBtnClick = () => {
      tickspeedRef.current = tickspeedRef.current * (1 - gs.tickspeedDeceaseRate);
      dispatch({ type: ACTIONS.UPDATE_TICKSPEED_ONCE });
   };
   const handleBuyMaxClick = () => {
      tickspeedRef.current =
         tickspeedRef.current * (1 - gs.tickspeedDeceaseRate) ** maxPurchaseQtys;
      dispatch({
         type: ACTIONS.UPDATE_TICKSPEED_MAX,
         payload: { maxPurchaseQtys: maxPurchaseQtys, purchasePrice: purchasePrice },
      });
   };

   return (
      <div className='gridContainer3Rows'>
         <p className='centered'>{`The current clockspeed is ${tickspeedRef.current.toFixed(
            0
         )} ms. Reduce the tickspeed by ${(gs.tickspeedDeceaseRate* 100).toFixed(1)}%.`}</p>
         <div className='centered'>
            <button
               className='btn'
               onClick={handleTickBtnClick}
               disabled={gs.antimatter - gs.tickspeedPrice <= 0}>
               Cost one time: {gs.tickspeedPrice}{' '}
            </button>
            <button
               className='btn'
               onClick={handleBuyMaxClick}
               disabled={gs.antimatter < gs.tickspeedPrice}>
               Buy Max ({maxPurchaseQtys})
            </button>
         </div>
      </div>
   );
}
