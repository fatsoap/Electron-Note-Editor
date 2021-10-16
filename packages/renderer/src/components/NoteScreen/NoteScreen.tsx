import React, { useState, useEffect } from "react";
import "./NoteScreen.css";
import MDEditor from "@uiw/react-md-editor";

const NoteScreen = () => {
  const [text, setText] = useState("**Hello world!!!**");
  const [editing, setEditing] = useState(false);

  //let main_screen = screen.getAllDisplays();
  let win_h = 500; //main_screen.size.height

  useEffect(() => {
    //window.customApi.writeFile("test.txt", "some text");
    refresh();
  }, []);

  const refresh = async () => {
    //let a = await window.customApi.readFile("test.txt");
    console.log(window.customApi.rootFolder);
    //let a = await window.customApi.getAllFile();
    //console.log(a);
  };

  return (
    <div className="note-container" style={{}}>
      <div>
        <button onClick={() => setEditing(!editing)}>Toggle</button>
      </div>
      {editing ? (
        <MDEditor
          value={text}
          onChange={(t) => {
            if (t) setText(t);
          }}
          height={win_h}
          commands={[]}
          preview={"edit"}
          visiableDragbar={false}
          hideToolbar={true}
          style={{
            backgroundColor: "transparent",
            WebkitBoxShadow: "0px",
            boxShadow: "0px 0px 0px #000000",
            height: 700,
          }}
        />
      ) : (
        <MDEditor.Markdown source={text} className="textarea" />
      )}
    </div>
  );
};

export default NoteScreen;
