import { maxPurchaseQty } from "./getMaxPurchaseQtyRecursive";
import {describe, expect, it} from "vitest";

describe("getMaxPurchaseQtyRecursive ", ()=>{

   it('return zero if we have no money', () => {
      expect(maxPurchaseQty({cost: 1234242, balance: 0})).toEqual(0)
   })
   it('return one if we can afoard only one', () => {
      expect(maxPurchaseQty({ cost: 100, balance: 100})).toEqual(1)
   })

});
