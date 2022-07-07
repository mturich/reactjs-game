import { useRef, useEffect } from "react";
import { GameState } from "../common/GameStateInterface";

export default function Tickspeed(props: { gameState: GameState; setGameState: any; clockSpeedRef: any; }) {
   const timeIdRef = useRef(-1);
   const canIstillBuyRef = useRef(0);
   const { gameState, setGameState, clockSpeedRef} = props;


   const handleTickBtnClick = () => {
      clockSpeedRef.current = clockSpeedRef.current * (1 - gameState.tickspeedDeceaseRate);
      setGameState((prevGS: GameState) => ({
         ...prevGS,
         antimatter: prevGS.antimatter - prevGS.tickspeedPrice,
         tickspeedPrice: prevGS.tickspeedPrice * 10,
      }));
   };

   useEffect(() => {
      canIstillBuyRef.current = gameState.antimatter - gameState.tickspeedPrice;
   }, [gameState.tickspeedPrice]);

   /* ref is needed to get the current state */
   const canIstillBuy = () => {
      if (canIstillBuyRef.current > 0) return true;
      else return false;
   };

   /* It works but I do not know if there are better ways */
   const handleBuyMaxClick = () => {
      const repeatMax = () => {
         timeIdRef.current = setTimeout(() => {
            if (canIstillBuy()) {
               console.log(canIstillBuy(), canIstillBuyRef.current, gameState.tickspeedPrice);
               handleTickBtnClick();
               repeatMax();
            }
         }, 20);

         return () => clearTimeout(timeIdRef.current);
      };
      repeatMax();
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
               disabled={gameState.antimatter - gameState.tickspeedPrice <= 0}>
               Buy Max
            </button>
         </div>
      </div>
   );
}
