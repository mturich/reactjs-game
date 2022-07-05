const initialGameState = {
   antimatter: 1000,

   canIstillBuyRef: 0,
   clockSpeedRef: 2000,
   timerIdRef: -1,
   idRef: -1,
   timeIdRef: -1,

   tickspeedPrice: 10,
   resetGameCounter: 2,
   galaxyCounter: 0,
   highesDim: 0,

   firstDimFactor: 1.1,
   firstDimCount: 0,
   firstDimPrice: 10,
   firstDimFactorCount: 0,

   secondDimFactor: 1.1,
   secondDimCount: 0,
   secondDimPrice: 100,
   secondDimFactorCount: 0,
   
   thirdDimFactor: 1.1,
   thirdDimCount: 0,
   thirdDimPrice: 1000,
   thirdDimFactorCount: 0,
 
};

export default JSON.stringify(initialGameState);
