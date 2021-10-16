import { contextBridge, ipcRenderer } from "electron";
import { readFile, writeFile, readdir, mkdir } from "fs/promises";
import * as path from "path";

import * as Constant from "./constant";
import { ROOT, NOTE, TODO, SETTING } from "./constant";
const userDataPath = ipcRenderer.sendSync("get-user-data-path", "ping");
const root_folder = path.join(userDataPath, ROOT);
const note_folder = NOTE;
const todo_folder = TODO;
const setting_folder = SETTING;

/**
 * Init Folders
 * Root
 * - Note
 * - Todo
 * - Setting
 *
 */
mkdir(root_folder, { recursive: true });
mkdir(path.join(root_folder, NOTE), { recursive: true });
mkdir(path.join(root_folder, TODO), { recursive: true });
mkdir(path.join(root_folder, SETTING), { recursive: true });

const customKey = "customApi";
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const customApi = {
  readFile: async (dir: string) =>
    await readFile(path.join(root_folder, dir), { encoding: "utf-8" }),
  writeFile: async (dir: string, data: string) =>
    await writeFile(path.join(root_folder, dir), data),
  getAllFile: async (dir: string) => await readdir(path.join(root_folder, dir)),
  getDirname: __dirname,
  rootFolder: root_folder,
  path: path,
  paths: {
    root_folder,
    note_folder,
    todo_folder,
    setting_folder,
  },
};

contextBridge.exposeInMainWorld(customKey, customApi);

const apiKey = "electron";
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const api: ElectronApi = {
  versions: process.versions,
};

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */
contextBridge.exposeInMainWorld(apiKey, api);
