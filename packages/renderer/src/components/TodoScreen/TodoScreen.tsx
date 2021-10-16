import React, { useState, useEffect } from "react";
import "./TodoScreen.css";
import MDEditor from "@uiw/react-md-editor";

interface todo {
  height: number;
  text: string;
}

const TodoScreen = () => {
  const default_height = 31;
  const [text, setText] = useState<todo[]>([
    { height: default_height, text: "**Hello world!!!**" },
  ]);
  const { readFile, writeFile, paths, path, getAllFile } = window.customApi;

  //let main_screen = screen.getAllDisplays();
  let win_h = 500; //main_screen.size.height

  useEffect(() => {
    //window.customApi.writeFile("test.txt", "some text");
    refresh();
  }, []);

  const refresh = async () => {
    //let a = await window.customApi.readFile("test.txt");
    let allTodos = await getAllFile(paths.todo_folder);
    console.log(allTodos);
  };

  // const addListeners = () => {
  //   let dragSources = document.querySelectorAll('.todo-list');
  //   dragSources.forEach((dragSource) => {
  //     dragSource.addEventListener("dragstart", dragStart);
  //   });
  // };

  function dragStart(e: React.DragEvent<HTMLTextAreaElement>) {
    const id = (e.target as HTMLTextAreaElement).id;
    e.dataTransfer.setData("text/plain", id);
    console.log(id);
  }
  function dragDrop(e: React.DragEvent<HTMLTextAreaElement>) {
    const old_id = Number(e.dataTransfer.getData("text/plain"));
    const new_id = Number((e.target as HTMLTextAreaElement).id);
    let tmp = text[old_id];
    text[old_id] = text[new_id];
    text[new_id] = tmp;
    setText([...text]);
  }

  const textareaAutoHeight = (index: number) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.target.style.height = "5px";
      e.target.style.height = e.target.scrollHeight + "px";
      let new_text = text;
      new_text[index] = {
        text: e.target.value,
        height: Number(e.target.scrollHeight),
      };
      setText([...new_text]);
    };
  };

  return (
    <div className="note-container" style={{}}>
      <button
        onClick={() => setText([...text, { text: "", height: default_height }])}
        className="add-todo plus"
      />
      {text.map((t, i) => {
        console.log(t);
        return (
          <textarea
            id={i.toString()}
            className="todo-list"
            value={t.text}
            style={{ height: t.height }}
            draggable="true"
            onDragStart={dragStart}
            onDrop={dragDrop}
            onChange={textareaAutoHeight(i)}
          ></textarea>
        );
      })}
    </div>
  );
};

export default TodoScreen;
