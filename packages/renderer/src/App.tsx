import React, { useState } from "react";
import "./app.css";
import bg from "../assets/bg.jpg";
import NoteScreen from "./components/NoteScreen/NoteScreen";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app container">
      <img src={bg} id="background" />
      <h2>This is React + Vite + Electron !</h2>
      <main>
        <NoteScreen />
      </main>
    </div>
  );
};

export default App;
