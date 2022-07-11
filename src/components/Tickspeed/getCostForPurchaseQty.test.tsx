import { describe, expect, it } from 'vitest';
import { getCostForPurchaseQty } from './getCostForPurchaseQty';

describe('getCostForPurchaseQty', () => {
   it('if nothing is bought, there is no cost increase', () => {
      expect(getCostForPurchaseQty(10, 0)).toEqual(0);
   });
   it('if 1 Qty is bought, the cost is the initial cost', () => {
      expect(getCostForPurchaseQty(10, 1)).toEqual(10);
   });
   it('if 2 Qty are bought, the cost is the initial cost + 10 *initial cost', () => {
      expect(getCostForPurchaseQty(10, 2)).toEqual(110);
   });
   it('if 5 Qty are bought, the cost is the initial cost + 10 *initial cost + ... + 10^5*initial cost', () => {
      expect(getCostForPurchaseQty(10, 2)).toEqual(111110);
   });
});
