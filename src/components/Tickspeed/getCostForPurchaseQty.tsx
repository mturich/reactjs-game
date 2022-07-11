export const getCostForPurchaseQty = (firstCost: number, quantity: number): number => {
   if (quantity === 0) return 0;
   else if (quantity === 1) {
      return firstCost;
   } else return firstCost + getCostForPurchaseQty(firstCost * 10, quantity - 1)
};
 