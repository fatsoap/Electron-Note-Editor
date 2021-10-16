import React, { useState, useEffect, useRef } from "react";
import "./TodoScreen.css";
import MDEditor from "@uiw/react-md-editor";

interface todo {
  height: number;
  text: string;
}

const TodoScreen = () => {
  const { readFile, writeFile, paths, path, getAllFile, rootFolder } =
    window.customApi;
  const default_file_name = path.join(paths.todo_folder, "TODO.txt");
  const default_height = 31;
  const [text, setText] = useState<todo[]>([
    { height: default_height, text: "**Hello world!!!**" },
  ]);
  const timer = useRef(-1);

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
      await writeFile(
        default_file_name,
        JSON.stringify([{ height: default_height, text: "**Hello world!!!**" }])
      );
    } else {
      let content = await readFile(default_file_name);
      setText(JSON.parse(content));
    }
  };

  const search_timer = (txt: string) => {
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      save(txt);
    }, 1000); // search after 1 sec no change
  };

  const save = async (txt: string) => {
    await writeFile(default_file_name, txt);
  };

  const dragStart = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const id = (e.target as HTMLTextAreaElement).id;
    e.dataTransfer.setData("text/plain", id);
  };

  const dragDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    const old_id = Number(e.dataTransfer.getData("text/plain"));
    const new_id = Number((e.target as HTMLTextAreaElement).id);
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
      };
      setText([...new_text]);
      search_timer(JSON.stringify(new_text));
    };
  };

  return (
    <div className="note-container" style={{}}>
      <button
        onClick={() => setText([...text, { text: "", height: default_height }])}
        className="add-todo plus"
      />
      {text.map((t, i) => {
        return (
          <textarea
            id={i.toString()}
            key={i}
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
