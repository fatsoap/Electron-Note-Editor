import React, { useState, useEffect, useRef, createRef } from "react";
import "./SettingScreen.css";
import MDEditor from "@uiw/react-md-editor";
import trashcan from "../../../assets/trashcan.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface todo {
  height: number;
  text: string;
  isDone: boolean;
}

const SettingScreen = () => {
  const { readFile, writeFile, paths, path, getAllFile, rootFolder } =
    window.customApi;
  const default_file_name = path.join(paths.todo_folder, "TODO.txt");
  const default_height = 31;
  const [text, setText] = useState<todo[]>([]);
  const timer = useRef(-1);
  const [focusList, setFocus] = useState(-1);

  //let main_screen = screen.getAllDisplays();
  let win_h = 500; //main_screen.size.height

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    //let a = await window.customApi.readFile("test.txt");
    let allTodos = await getAllFile(paths.todo_folder);
    if (allTodos.length === 0) {
      // do nothing
      await writeFile(default_file_name, JSON.stringify([]));
    } else {
      let content = await readFile(default_file_name);
      setText(JSON.parse(content));
    }
  };

  return (
    <div className="todo-container" style={{}}>
      <input type="file" onChange={(e) => console.log(e.target.value)} />
    </div>
  );
};

export default SettingScreen;
