import React, { useState } from "react";
import "./NavBar.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faCheckCircle,
  faStickyNote,
  faComment,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const history = useHistory();
  const [current, setCurrent] = useState("");

  return (
    <div className="nav-container" style={{}}>
      <div>
        <button
          className={
            current === "note" ? "nav-bar-btn  nav-bar-btn-ac" : "nav-bar-btn "
          }
          onClick={() => {
            setCurrent("note");
            history.push("/note");
          }}
        >
          <FontAwesomeIcon icon={faStickyNote} className="nav-bar-icon" />
        </button>
      </div>
      <div>
        <button
          className={
            current === "todo" ? "nav-bar-btn  nav-bar-btn-ac" : "nav-bar-btn "
          }
          onClick={() => {
            setCurrent("todo");
            history.push("/todo");
          }}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="nav-bar-icon" />
        </button>
      </div>

      <div>
        <button
          className={
            current === "setting"
              ? " nav-bar-btn nav-bar-btn-ac"
              : "nav-bar-btn"
          }
          onClick={() => {
            setCurrent("setting");
            history.push("/setting");
          }}
        >
          <FontAwesomeIcon icon={faCogs} className="nav-bar-icon" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
