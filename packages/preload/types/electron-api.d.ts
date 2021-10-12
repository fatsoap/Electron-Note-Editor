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
  getAllFile: () => Promise<string[]>;
  getDirname: string;
  dataFolder: string;
}
