import React, { useState, useRef } from "react";
import "./NoteScreen.css";
import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextAreaTextApi,
} from "@uiw/react-md-editor";

const NoteScreen = () => {
  const [text, setText] = useState("**Hello world!!!**");
  const [editing, setEditing] = useState(false);
  const tt: any = useRef(null);
  return (
    <div className="container" style={{ border: "1px solid black" }}>
      <div>
        <button onClick={() => setEditing(!editing)}>Toggle</button>
      </div>
      {editing ? (
        <MDEditor
          value={text}
          onChange={(t) => {
            if (t) setText(t);
          }}
          commands={[]}
          preview={"edit"}
          visiableDragbar={false}
          hideToolbar={true}
          style={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "red",
            borderRadius: "30px",
            WebkitBoxShadow: "0px",
            boxShadow: "0px 0px 0px #000000",
          }}
        />
      ) : (
        <MDEditor.Markdown source={text} className="textarea" />
      )}
    </div>
  );
};

export default NoteScreen;
