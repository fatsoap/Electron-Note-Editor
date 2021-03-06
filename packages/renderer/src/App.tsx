import React from "react";
import "./app.css";
import bg from "../assets/bg.jpg";
import NoteScreen from "./components/NoteScreen/NoteScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import TodoScreen from "./components/TodoScreen/TodoScreen";
import SettingScreen from "./components/SettingScreen/SettingScreen";

const App = () => {
  return (
    <div className="app">
      <Router>
        <div className="app-container">
          <NavBar />
          <main className="main-container">
            <img src={bg} id="background" />
            <Switch>
              <Route path="/note">
                <NoteScreen />
              </Route>
              <Route path="/todo">
                <TodoScreen />
              </Route>
              <Route path="/setting">
                <SettingScreen />
              </Route>
              <Route path="/">
                <div />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;

// String.prototype.hashCode = function () {
//   var hash = 0,
//     i,
//     chr;
//   if (this.length === 0) return hash;
//   for (i = 0; i < this.length; i++) {
//     chr = this.charCodeAt(i);
//     hash = (hash << 5) - hash + chr;
//     hash |= 0; // Convert to 32bit integer
//   }
//   return hash;
// };
