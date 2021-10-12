import React from "react";
import "./app.css";
import bg from "../assets/bg.jpg";
import NoteScreen from "./components/NoteScreen/NoteScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    
    <div className="app">
      <Router>
      <img src={bg} id="background" />
      <main className="main-container" >
        <NavBar />
        <Switch>
          <Route path="/note">
            <NoteScreen />
          </Route>
          <Route path="/users">
          <div />
          </Route>
          <Route path="/">
          <div />
          </Route>
        </Switch>
      </main>
      </Router>
    </div>
  );
};

export default App;
