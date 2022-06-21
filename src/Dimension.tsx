import { useState, useEffect, Children } from 'react';
import './Dimentions.css';

type DimProps = {
   antimatter: number;
   setAntimatter: (fn: ((antimatter: number) => void) | number) => void;
   dimCount: number;
   setDimCount: (fn: (dim: number) => void) => void;
   price: number;
   setPrice: (fn: (dim: number) => void) => void;
   factor: number;
   setFactor: (fn: (dim: number) => void) => void;
   dimFactorCount: number;
   setDimFactorCount: (fn: ((antimatter: number) => void) | number) => void;
   children: string;
};
export default function Dimension(props: DimProps) {

   const { antimatter, dimCount, setDimCount, setAntimatter, price, setPrice, factor, setFactor, dimFactorCount, setDimFactorCount } = props;
    
   const handleDimBuy = (quantity: number) => {
      if (antimatter >= price) {
         setDimCount(dimCount => dimCount + quantity);
         setAntimatter(prevValue => prevValue - price * quantity);
         setDimFactorCount(prevCount => prevCount +1)
      }
      if ((dimCount + 1) % 10 === 0 && dimCount > 1 || quantity===10) {
         setPrice(prevPrice => prevPrice * 10);
         setFactor(prevFactor => prevFactor * 2)
         setDimFactorCount(0)
      }
   };


   return (
      <>
         <br />
         <div className='gridContainer4Cols'>
            <p className='centered'>
               {`${ props.children.split(" ").slice(0,2).join(" ")}   x${factor}`}
            </p>
            <p className='centered'>
               {` ${dimCount % 1 === 0 ? dimCount.toFixed(0) : dimCount.toFixed(1)}
                  (${dimFactorCount})
               
               `}
            </p>
            <button className='btn' onClick={() => handleDimBuy(1)} disabled={antimatter < price}>
               {props.children.split(" ").slice(2,4).join(" ")}
            </button>
            <button
               className='btn'
               onClick={() => handleDimBuy(10)}
               disabled={antimatter < 10 * price}>
               Buy 10x, Cost: {price*10}
            </button>
         </div>

         <br />
      </>
   );
}
