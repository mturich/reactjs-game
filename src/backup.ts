const data = {
   timerId,
   toSaveId,
   clockSpeedRef,
   tickspeedPrice,
   antimatter,
   firstDimCount,
   firstDimFactor,
   firstDimPrice,
   firstDimFactorCount,
   secondDimCount,
   secondDimFactor,
   secondDimPrice,
   secondDimFactorCount,
   thirdDimCount,
   thirdDimFactor,
   thirdDimPrice,
   thirdDimFactorCount,
};
const canIstillBuy = () => {
   if (canIstillBuyRef.current > 0) true
   else false
}