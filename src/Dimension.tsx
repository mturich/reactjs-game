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
   const { balance, dimCount, setDimCount, setBalance, price } = props;

   const handleDimBuy = (quantity:number) => {
      if (balance >= price) {
         setDimCount(dimCount => dimCount + quantity);
         setBalance(balance => balance - price*quantity);
      }
   };
   return (
      <>
         <br />
         <div className='gridContainer'>
            <p className='centered'>
               {`You have ${dimCount%1===0 ? dimCount.toFixed(0): dimCount.toFixed(1)} ${props.children.split(' ')[0]}
               ${price / 10}x`}
            </p>
            <p className='centered'>
               {`You have ${dimCount%1===0 ? dimCount.toFixed(0): dimCount.toFixed(1)} ${props.children.split(' ')[0]}
               ${price / 10}x`}
            </p>
            <button className='btn' onClick={()=> handleDimBuy(1)} disabled={balance < price}>
               {props.children}
            </button>
            <button className='btn' onClick={()=> handleDimBuy(10)} disabled={balance < 10*price}>
               Buy 10x {props.children}
            </button>
         </div>

         <br />
      </>
   );
}
