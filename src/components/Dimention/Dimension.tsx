import { DimProps } from '../../common/GameStateInterface';
import { ACTIONS } from '../../common/reducer';

export default function Dimension(props: DimProps) {
   const { nthDim, gs, dispatch } = props;

   const handleDimBuy = (quantity: number) => {
      if (gs.antimatter >= gs.dims[nthDim].dimPrice) {
         dispatch({ type: ACTIONS.UPDATE_DIM, payload: { nthDim: nthDim, quantity: quantity } });
      }
      if (
         ((gs.dims[nthDim].dimCount + 1) % 10 === 0 && gs.dims[nthDim].dimCount > 1) ||
         quantity === 10
      ) {
         dispatch({
            type: ACTIONS.UPDATE_10TH_DIM,
            payload: { nthDim: nthDim, quantity: quantity },
         });
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
