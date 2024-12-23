import { useState } from "react";
import RainCanvas from "./components/RainCanvas";
import ControlPanel from "./components/ControlPanel";

function App() {
  const [size, setSize] = useState(1.5);
  const [speed, setSpeed] = useState(2);

  function handleSize(size) {
    setSize(size);
  }

  function handleSpeed(speed) {
    setSpeed(speed);
  }

  return (
    <>
      <RainCanvas sizeConstant={size} speedConstant={speed} />
      <ControlPanel
        size={size}
        onSize={handleSize}
        speed={speed}
        onSpeed={handleSpeed}
      />
    </>
  );
}

export default App;
