import { GameState, DimProps, Dim } from '../common/GameStateInterface';

export default function Dimension(props: DimProps) {
   const { nthDim, gs, setGameState } = props;

   const handleDimBuy = (quantity: number) => {
      const newDim = [gs.dims[nthDim].dimCount + quantity];

      if (gs.antimatter >= gs.dims[nthDim].dimPrice) {
         /*    
         setDimCount(dimCount => dimCount + quantity);
         setAntimatter(prevValue => prevValue - price * quantity);
         setDimFactorCount(prevCount => prevCount + 1); */
         setGameState((prevGS: GameState) => ({
            ...prevGS,
            antimatter: prevGS.antimatter - prevGS.dims[nthDim].dimPrice * quantity,
            dims: prevGS.dims.map((dim: Dim, index: number) => {
               if (dim.nthDim !== nthDim) return dim;
               return {
                  ...dim,
                  dimCount: dim.dimCount + quantity,
                  dimFactorCount: dim.dimFactorCount + quantity,
               };
            }),
         }));
      }
      if (
         ((gs.dims[nthDim].dimCount + 1) % 10 === 0 && gs.dims[nthDim].dimCount > 1) ||
         quantity === 10
      ) {
         /*          
         setPrice(prevPrice => prevPrice * 10);
         setFactor(prevFactor => prevFactor * 2)
         setDimFactorCount(0) */
         setGameState((prevGS: GameState) => ({
            ...prevGS,
            dims: prevGS.dims.map((dim: Dim, index: number) => {
               if (dim.nthDim !== nthDim) return dim;
               return {
                  ...dim,
                  dimPrice: dim.dimPrice * 10,
                  dimFactor: dim.dimFactor * 2,
                  dimFactorCount: 0,
               };
            }),
         }));
      }
   };

   return (
      <>
         <br />
         <div className='gridContainer4Cols'>
            <p className='centered'>
               {`${props.children.split(' ').slice(0, 2).join(' ')}   x${
                  gs.dims[nthDim].dimFactor
               }`}
            </p>
            <p className='centered'>
               {` ${
                  gs.dims[nthDim].dimCount % 1 === 0
                     ? gs.dims[nthDim].dimCount.toFixed(0)
                     : gs.dims[nthDim].dimCount.toFixed(1)
               }
                  (${gs.dims[nthDim].dimFactorCount})
               
               `}
            </p>

            <button
               className='btn'
               onClick={() => handleDimBuy(1)}
               disabled={gs.antimatter < gs.dims[nthDim].dimPrice}>
               {props.children.split(' ').slice(2, 4).join(' ')}
            </button>
            <button
               className='btn'
               onClick={() => handleDimBuy(10)}
               disabled={gs.antimatter < 10 * gs.dims[nthDim].dimPrice}>
               Buy 10x, Cost: {gs.dims[nthDim].dimPrice * 10}
            </button>
         </div>

         <br />
      </>
   );
}
