import { useState, useEffect } from 'react';
import './App.css';

function App() {
   const [count, setCount] = useState(0);
   const [firstDimCount, setFirstDimCount] = useState(0);
   const [timer, setTime] = useState(0);

   useEffect(() => {
      const startTimer = () => {
         const myTimer = setTimeout(() => {
            console.log(count, firstDimCount);
            setCount(count => count + firstDimCount);
            startTimer();
         }, 1000);
      };
   
    startTimer();
      return () => {};
   }, []);

   return (
      <div className='App'>
         <div className='score'>You have {count} antimatters.</div>
         <div>You have {firstDimCount} First Dimension x2.0</div>
         <button onClick={() => setFirstDimCount(firstDimCount + 1)}>Buy Dimension</button>
      </div>
   );
}

export default App;
