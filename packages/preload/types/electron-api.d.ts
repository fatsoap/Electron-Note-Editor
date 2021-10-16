interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>;
}

declare interface Window {
  electron: Readonly<ElectronApi>;
  electronRequire?: NodeRequire;
  customApi: CustomAPI;
}

interface CustomAPI {
  readFile: (dir: string) => Promise<string>;
  writeFile: (dir: string, data: string) => Promise<void>;
  getAllFile: (dir: string) => Promise<string[]>;
  getDirname: string;
  rootFolder: string;
  path: PlatformPath;
  paths: {
    root_folder: string;
    note_folder: string;
    todo_folder: string;
    setting_folder: string;
  };
}
