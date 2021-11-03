import React, { useState, useEffect, useRef } from "react";
import "./NoteScreen.css";
import MDEditor from "@uiw/react-md-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBookOpen } from "@fortawesome/free-solid-svg-icons";

const NoteScreen = () => {
  const { readFile, writeFile, paths, path, getAllFile, rootFolder } =
    window.customApi;
  const default_file_name = path.join(paths.note_folder, "NOTE.txt");
  const [text, setText] = useState("**Hello world!!!**");
  const [editing, setEditing] = useState(false);
  const timer = useRef(-1);

  //let main_screen = screen.getAllDisplays();
  let win_h = 500; //main_screen.size.height

  useEffect(() => {
    //window.customApi.writeFile("test.txt", "some text");
    refresh();
  }, []);

  const refresh = async () => {
    console.log(window.customApi.rootFolder);
    let allNotes = await getAllFile(paths.note_folder);
    if (allNotes.length === 0) {
      // do nothing
      await writeFile(default_file_name, "# Markdown Editor !");
    } else {
      let content = await readFile(default_file_name);
      setText(content);
    }
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

  const onEdit = async (txt: string | undefined) => {
    if (txt) {
      setText(txt);
      save_timer(txt);
    }
  };

  return (
    <div className="note-container" style={{}}>
      <div className="note-toggle-btn-box">
        <button
          className="note-toggle-btn"
          onClick={() => setEditing(!editing)}
        >
          {editing ? (
            <FontAwesomeIcon icon={faBookOpen} className="nav-bar-icon" />
          ) : (
            <FontAwesomeIcon icon={faEdit} className="nav-bar-icon" />
          )}
        </button>
      </div>
      {editing ? (
        <MDEditor
          value={text}
          onChange={onEdit}
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
        <MDEditor.Markdown
          source={text}
          className="textarea"
          style={{ paddingLeft: 15 }}
        />
      )}
    </div>
  );
};

export default NoteScreen;
