interface calcMaxPurchasableQtyInterface {
   cost: number;
   balance: number;
   qty: number;
}

export const calcMaxPurchasableQty = ({ cost, balance, qty = 0 }: calcMaxPurchasableQtyInterface): number => {
   if (cost > balance) return qty;
   else return calcMaxPurchasableQty({ cost: cost * 10, balance: balance - cost, qty: qty + 1 });
};
