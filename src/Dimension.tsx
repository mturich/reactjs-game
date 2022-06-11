import { useState, useEffect } from 'react';

export default function Dimension(props) {
   const { balance, firstDimCount, setFirstDimCount, setBalance, factor } = props;

   const handleFirstDimBuy = () => {
      if (balance >= factor) {
         setFirstDimCount(firstDimCount => firstDimCount + factor / 10);
         setBalance(balance => balance - factor);
      }
   };
   return (
      <>
         <div>You have {firstDimCount} First Dimension x2.0</div>
         <button onClick={handleFirstDimBuy} disabled={balance < factor}>
            Buy 1. Dimension
         </button>
      </>
   );
}
