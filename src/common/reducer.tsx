import { Dim, GameState } from './GameStateInterface';
import initialGameState from './initialGameState';

export const ACTIONS = {
   TIMER_CALLBACK: 'TIMER_CALLBACK',
   UPDATE_DIM: 'UPDATE_DIM',
   UPDATE_10TH_DIM: 'UPDATE_10TH_DIM',
   UPDATE_TICKSPEED_ONCE: 'UPDATE_TICKSPEED_ONCE',
   UPDATE_TICKSPEED_MAX: 'UPDATE_TICKSPEED_MAX',
   RESET_TO_UNLOCK_DIM: 'RESET_TO_UNLOCK_DIM',
   RESET_TO_UNLOCK_TICKSPEED: 'RESET_TO_UNLOCK_TICKSPEED',
   RESET_TO_INITIAL_VALUES: 'RESET_TO_INITIAL_VALUES',
   POP_UP: 'POP_UP',
   SAVE_DATA: 'SAVE_DATA',
   TOOGLE_GAME_NOTIFICATION_OPEN: 'TOOGLE_GAME_NOTIFICATION_OPEN',
   TOOGLE_GAME_NOTIFICATION_CLOSE: 'TOOGLE_GAME_NOTIFICATION_CLOSE',
};

export function reducer(state: GameState, action: { type: string; payload?: any }) {
   switch (action.type) {
      case ACTIONS.TIMER_CALLBACK:
         return {
            ...state,
            antimatter: state.antimatter + state.dims[0].dimCount * state.dims[0].dimFactor,
            dims: state.dims.map((dim: Dim, index: number) => {
               return {
                  ...dim,
                  dimCount:
                     dim.dimCount +
                     ((state.dims[index + 1]?.dimCount ?? 0) *
                        (state.dims[index + 1]?.dimFactor ?? 0)) /
                        Math.pow(10, index + 1),
               };
            }),
         };

      case ACTIONS.UPDATE_DIM:
         return {
            ...state,
            antimatter:
               state.antimatter -
               state.dims[action.payload.nthDim].dimPrice * action.payload.quantity,
            dims: state.dims.map((dim: Dim) => {
               if (dim.nthDim !== action.payload.nthDim) return dim;
               return {
                  ...dim,
                  dimCount: dim.dimCount + action.payload.quantity,
                  dimFactorCount: dim.dimFactorCount + action.payload.quantity,
               };
            }),
         };

      case ACTIONS.UPDATE_10TH_DIM:
         return {
            ...state,
            dims: state.dims.map((dim: Dim) => {
               if (dim.nthDim !== action.payload.nthDim) return dim;
               return {
                  ...dim,
                  dimPrice: dim.dimPrice * 10,
                  dimFactor: dim.dimFactor * 2,
                  dimFactorCount: 0,
               };
            }),
         };

      case ACTIONS.UPDATE_TICKSPEED_ONCE:
         return {
            ...state,
            antimatter: state.antimatter - state.tickspeedPrice,
            tickspeedPrice: state.tickspeedPrice * 10,
         };
      case ACTIONS.UPDATE_TICKSPEED_MAX:
         return {
            ...state,
            antimatter: state.antimatter - action.payload.purchasePrice,
            tickspeedPrice: state.tickspeedPrice * 10 ** action.payload.maxPurchaseQtys,
         };

      case ACTIONS.RESET_TO_UNLOCK_DIM:
         return {
            ...JSON.parse(initialGameState),
            galaxyCounter: state.galaxyCounter,
            tickspeedDeceaseRate: state.tickspeedDeceaseRate,
            resetGameCounter: state.resetGameCounter + 1,
            lastSavedTime: state.lastSavedTime,
         };

      case ACTIONS.RESET_TO_UNLOCK_TICKSPEED:
         return {
            ...JSON.parse(initialGameState),
            galaxyCounter: state.galaxyCounter + 1,
            tickspeedDeceaseRate: state.tickspeedDeceaseRate * 1.1,
            lastSavedTime: state.lastSavedTime,
         };

      case ACTIONS.RESET_TO_INITIAL_VALUES:
         return JSON.parse(initialGameState);

      case ACTIONS.SAVE_DATA:
         return {
            ...state,
            lastSavedTime: Date.now(),
         };

      case ACTIONS.TOOGLE_GAME_NOTIFICATION_CLOSE: {
         return {
            ...state,
            showGameSavedNotification: false,
         };
      }
      case ACTIONS.TOOGLE_GAME_NOTIFICATION_OPEN: {
         return {
            ...state,
            showGameSavedNotification: true,
         };
      }

      default:
         return state;
   }
}
