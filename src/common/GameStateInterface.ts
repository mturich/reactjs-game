import { Children } from 'react';
export interface GameState {
   antimatter: number;
   tickspeedPrice: number;
   tickspeedDeceaseRate: number,
   resetGameCounter: number;
   galaxyCounter: number;
   lastSavedTime: number;
   dims: Dim[];
}

export interface Dim {
   nthDim: number;
   dimFactor: number;
   dimCount: number;
   dimPrice: number;
   dimFactorCount: number;
}

export type DimProps = {
   nthDim: number;
   gs: GameState;
   setGameState: (fn: (gameState: GameState) => void) => void;
   children: string;
};
