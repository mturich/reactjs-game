interface maxPurchaseQtyInterface {
   cost: number;
   balance: number;
   qty: number;
}

export const maxPurchaseQty = ({ cost, balance, qty = 0 }: maxPurchaseQtyInterface): number => {
   if (cost > balance) return qty;
   else return maxPurchaseQty({ cost: cost * 10, balance: balance - cost, qty: qty + 1 });
};
