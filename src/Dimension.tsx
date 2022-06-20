import { useState, useEffect } from 'react';
import './Dimentions.css';

type DimProps = {
   balance: number;
   dimCount: number;
   setDimCount: (fn: (dim: number) => void) => void;
   setBalance: (fn: ((balance: number) => void) | number) => void;
   price: number;
   children: string;
};
export default function Dimension(props: DimProps) {
   const { balance, dimCount, setDimCount, setBalance, price, setPrice } = props;

   const handleDimBuy = (quantity: number) => {
      if (balance >= price) {
         setDimCount(dimCount => dimCount + quantity);
         setBalance(balance => balance - price * quantity);
      }
      if ((dimCount + 1) % 10 === 0 && dimCount > 1) setPrice(prevPrice => prevPrice * 10);
   };
   return (
      <>
         <br />
         <div className='gridContainer4Cols'>
            <p className='centered'>
               {`You have ${dimCount % 1 === 0 ? dimCount.toFixed(0) : dimCount.toFixed(1)} ${
                  props.children.split(' ')[0]
               }
               ${price / 10}x`}
            </p>
            <p className='centered'>
               {` ${dimCount % 1 === 0 ? dimCount.toFixed(0) : dimCount.toFixed(1)}
                  (${dimCount.toFixed(0) % 10})
               
               `}
            </p>
            <button className='btn' onClick={() => handleDimBuy(1)} disabled={balance < price}>
               {props.children}
            </button>
            <button
               className='btn'
               onClick={() => handleDimBuy(10)}
               disabled={balance < 10 * price}>
               Buy 10x {props.children}
            </button>
         </div>

         <br />
      </>
   );
}
