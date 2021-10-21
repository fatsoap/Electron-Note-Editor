import React, { useState, useEffect, useRef, createRef } from "react";
import "./TodoScreen.css";
import MDEditor from "@uiw/react-md-editor";
import trashcan from "../../../assets/trashcan.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface todo {
  height: number;
  text: string;
  isDone: boolean;
}

const TodoScreen = () => {
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

  const addTodo = () => {
    setFocus(text.length);
    setText([...text, { text: "", height: default_height, isDone: false }]);
  };

  const deleteDoneTodo = () => {
    let new_todo = text.filter((t) => !t.isDone);
    setFocus(new_todo.length - 1);
    setText([...new_todo]);
    save_timer(JSON.stringify(new_todo));
  };

  const save_timer = (txt: string) => {
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      save(txt);
    }, 1000); // search after 1 sec no change
  };

  const save = async (txt: string) => {
    await writeFile(default_file_name, txt);
  };

  const dragStart = (e: React.DragEvent<HTMLLIElement>) => {
    let id = (e.target as HTMLLIElement).id;
    id = id.split("_")[0];
    e.dataTransfer.setData("text/plain", id);
  };

  const dragDrop = (e: React.DragEvent<HTMLLIElement>) => {
    let old_id = Number(e.dataTransfer.getData("text/plain"));
    let new_id = Number((e.target as HTMLLIElement).id.split("_")[0]);

    let tmp = text[old_id];
    text[old_id] = text[new_id];
    text[new_id] = tmp;
    setText([...text]);
  };

  const textareaAutoHeight = (index: number) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.target.style.height = "5px";
      e.target.style.height = e.target.scrollHeight + "px";
      let new_text = text;
      new_text[index] = {
        text: e.target.value,
        height: Number(e.target.scrollHeight),
        isDone: text[index].isDone,
      };
      setText([...new_text]);
      save_timer(JSON.stringify(new_text));
    };
  };

  const toggleIsDone = (index: number) => {
    return () => {
      let new_text = text;
      new_text[index] = {
        ...text[index],
        isDone: !text[index].isDone,
      };
      setText([...new_text]);
      save_timer(JSON.stringify(new_text));
    };
  };

  return (
    <div className="todo-container" style={{}}>
      <button onClick={addTodo} className="add-todo plus" />
      <header className="todo-tool-bar">
        <img
          src={trashcan}
          className="todo-tool-bar-icon"
          onClick={deleteDoneTodo}
        />
      </header>
      <ul className="todo-ul">
        {text.map((t, i) => {
          return (
            <li
              id={i.toString() + "_todo_list"}
              key={i}
              className={
                focusList === i ? "todo-list todo-list-focus" : "todo-list"
              }
              onClick={() => {
                setFocus(i);
              }}
              draggable="true"
              onDragStart={dragStart}
              onDrop={dragDrop}
            >
              <span className={"todo-dot"} onClick={toggleIsDone(i)}>
                {t.isDone && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="todo-dot-ac"
                  />
                )}
              </span>
              <textarea
                id={i.toString() + "_todo_textarea"}
                autoFocus={focusList === i}
                className={t.isDone ? "todo-text todo-text-ac" : "todo-text"}
                draggable="false"
                value={t.text}
                style={{ height: t.height }}
                spellCheck={false}
                onChange={textareaAutoHeight(i)}
              ></textarea>
              <div className="todo-drag"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoScreen;
