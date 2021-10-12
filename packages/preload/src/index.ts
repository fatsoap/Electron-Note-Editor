import { contextBridge } from "electron";
import { readFile, writeFile, readdir, mkdir } from "fs/promises";
import * as path from "path";
import { ipcRenderer } from "electron";
const userDataPath = ipcRenderer.sendSync("get-user-data-path", "ping");
const data_folder = path.join(userDataPath, "Data");

mkdir(data_folder, { recursive: true });

const customKey = "customApi";
/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
const customApi = {
  readFile: async (dir: string) =>
    await readFile(path.join(data_folder, dir), { encoding: "utf-8" }),
  writeFile: async (dir: string, data: string) =>
    await writeFile(path.join(data_folder, dir), data),
  getAllFile: async () => await readdir(data_folder),
  getDirname: __dirname,
  dataFolder: data_folder,
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
