import { calcMaxPurchasableQty } from './calcMaxPurchasableQty';
import { describe, expect, it } from 'vitest';

describe('maxPurchaseQty', () => {
   it('return zero if we have no money', () => {
      expect(calcMaxPurchasableQty({ cost: 1234242, balance: 0, qty: 0 })).toEqual(0);
   });
   it('return one if we can afford only one', () => {
      expect(calcMaxPurchasableQty({ cost: 10, balance: 100, qty: 0 })).toEqual(1);
   });

   it('return 2 if we can afford only 2', () => {
      expect(calcMaxPurchasableQty({ cost: 10, balance: 110, qty: 0 })).toEqual(2);
   });
   it('return 3 if we can afford only 3', () => {
      expect(calcMaxPurchasableQty
         ({ cost: 10, balance: 1110, qty: 0 })).toEqual(3);
   });
});
