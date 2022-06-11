import { useState, useEffect } from 'react';

type DimProps = {
   balance: number;
   dimCount: number;
   setDimCount: (fn: (dim: number) => void) => void;
   setBalance: (fn: ((balance: number) => void) | number) => void;
   factor: number;
   children: string;
};
export default function Dimension(props: DimProps) {
   const { balance, dimCount, setDimCount, setBalance, factor } = props;

   const handleFirstDimBuy = () => {
      if (balance >= factor) {
         setDimCount(dimCount => dimCount + 1);
         setBalance(balance => balance - factor);
      }
   };
   return (
      <>
         <br />
         <div>
            You have {dimCount} {props.children.split(" ")[0]} {factor / 10}x
         </div>
         <button onClick={handleFirstDimBuy} disabled={balance < factor}>
            {props.children}
         </button>
         <br />
      </>
   );
}
