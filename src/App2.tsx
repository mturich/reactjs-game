import { useState, useEffect } from 'react';
import './App.css';

function App() {
   const [count, setCount] = useState(0);
   const [firstDimCount, setFirstDimCount] = useState(0);
   const [timer, setTime] = useState(0);
   const [running, setRunning] = useState(false)

   useEffect(() => {
      if (running) {
            const myTimer = setInterval(() => {
            console.log(count, firstDimCount);
            setCount(count => count + firstDimCount);
         }, 500);

         return () => clearInterval(myTimer);
      }
     
   },[running]);

   return (
      <div className='App'>
         <div className='score'>You have {count} antimatters.</div>
         <div>You have {firstDimCount} First Dimension x2.0</div>
         <button onClick={() => setFirstDimCount(firstDimCount => firstDimCount + 1)}>Buy Dimension</button>
         <br></br>
         <button onClick={() => setRunning(running => !running)}>Start/Pause Timer</button>
      </div>
   );
}

export default App;
