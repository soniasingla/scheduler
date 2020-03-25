import { useState } from "react";

// Handle the different switch between modes and keep tracks of the previous modes to be able to go back
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Set a new mode and add it to the history
  const transition = (newMode, replace) => {
    setMode(newMode);
    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  };

  // Set a previous mode and removes the last one from the history
  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, prev.length - 1)]);
    }
  };

  return { mode, transition, back };
};