import { GameState } from './GameStateInterface';

let initialGameState: GameState = {
   antimatter: 1000,
   tickspeedPrice: 10,
   tickspeedDeceaseRate: 0.11,
   resetGameCounter: 2,
   galaxyCounter: 0,
   lastSavedTime: 0,
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
         dimCount: 20,
         dimPrice: 100,
         dimFactorCount: 0,
      },
      {
         nthDim: 2,
         dimFactor: 1.1,
         dimCount: 20,
         dimPrice: 1000,
         dimFactorCount: 0,
      },
      {
         nthDim: 3,
         dimFactor: 1.1,
         dimCount: 20,
         dimPrice: 10000,
         dimFactorCount: 0,
      },
      {
         nthDim: 4,
         dimFactor: 1.1,
         dimCount: 20,
         dimPrice: 100000,
         dimFactorCount: 0,
      },
      {
         nthDim: 5,
         dimFactor: 1.1,
         dimCount: 20,
         dimPrice: 1000000,
         dimFactorCount: 0,
      },
      {
         nthDim: 6,
         dimFactor: 1.1,
         dimCount: 20,
         dimPrice: 10000000,
         dimFactorCount: 0,
      },
      {
         nthDim: 7,
         dimFactor: 1.1,
         dimCount: 20,
         dimPrice: 100000000,
         dimFactorCount: 0,
      },
      {
         nthDim: 8,
         dimFactor: 1.1,
         dimCount: 20,
         dimPrice: 1000000000,
         dimFactorCount: 0,
      },
   ],
};

export default JSON.stringify(initialGameState);
