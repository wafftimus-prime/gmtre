import { ModuleNames } from './modules/moduleNames';
import { Module } from './interfaces/iModule';
import { MD5 } from './license/md5';
import { VERSION } from './version';

export const EnterpriseCoreModule: Module = {
  version: VERSION,
  moduleName: ModuleNames.EnterpriseCoreModule,
  beans: [],
  agStackComponents: [],
};
