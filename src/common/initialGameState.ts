import { GameState } from './GameStateInterface';

let initialGameState: GameState = {
   antimatter: 1000,
   tickspeedPrice: 10,
   resetGameCounter: 3,
   galaxyCounter: 0,
   //highesDim: 0,
   dims: [
      {
         nthDim: 0,
         dimFactor: 1.1,
         dimCount: 0,
         dimPrice: 10,
         dimFactorCount: 0,
      },
      {
         nthDim: 1,
         dimFactor: 1.1,
         dimCount: 0,
         dimPrice: 100,
         dimFactorCount: 0,
      },
      {
         nthDim: 2,
         dimFactor: 1.1,
         dimCount: 5,
         dimPrice: 1000,
         dimFactorCount: 0,
      },
   ],
};

export default JSON.stringify(initialGameState);
