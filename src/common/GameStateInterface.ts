import { Children } from 'react';
export interface GameState {
   antimatter: number;
   tickspeedPrice: number;
   tickspeedDeceaseRate: number;
   resetGameCounter: number;
   galaxyCounter: number;
   lastSavedTime: number;
   showGameSavedNotification: boolean;
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
   dispatch: Function;
   children: string;
};
