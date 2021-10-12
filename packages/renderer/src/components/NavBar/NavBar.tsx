import React, { useState } from "react";
import "./NavBar.css";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  const [current, setCurrent] = useState(0);

  return (
    <div className="nav-container" style={{ }}>
      <div className={current.toString()}>
        <button onClick={() => {
          setCurrent(1)
          history.push("/note")
        }}>Note</button>
      </div>
      <div>
        <button onClick={() => {
          setCurrent(1)
          history.push("/users")
        }}>Note</button>
      </div>
      <div>
        <button onClick={() => {
          setCurrent(1)
          history.push("/")
        }}>Note</button>
      </div>
    </div>
  );
};

export default NavBar;
