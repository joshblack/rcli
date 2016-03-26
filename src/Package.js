import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { print } from './utilities/print';

class Package {
  constructor(packageInfo, packageFilePath) {
    this._packageInfo = packageInfo;
    this._packageFilePath = packageFilePath;
  }

  async addInfo(key, value) {
    this._packageInfo[key] = value;

    await this._write();
  }

  async addScripts(config) {
    Object.keys(config).forEach((scriptName) => {
      this._packageInfo.scripts[scriptName] = config[scriptName];
    });

    await this._write();
  }

  install = (packageNames) => new Promise((resolve, reject) => {
    const packageFileDirectory = path.resolve(this._packageFilePath, '..');
    const command = [
      `cd ${packageFileDirectory}`,
      `npm install ${packageNames.join(' ')} --save-dev`
    ].join(' && ');

    print(`Running: ${command}`);
    print('Please be patient and kind while waiting for `npm@3` to finish!');

    exec(command, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  installAll = () => new Promise((resolve, reject) => {
    const packageFileDirectory = path.resolve(this._packageFilePath, '..');
    const command = `cd ${packageFileDirectory} && npm install`;

    print('Running `npm install` to catch any missing modules');

    exec(command, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  viewPackageFile = () => new Promise((resolve, reject) => {
    const handler = (error, packageInfo) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(JSON.parse(packageInfo));
    };
    const packageInfo = fs.readFile(this._packageFilePath, 'utf-8', handler);
  });

  async viewPackageFile() {
    const packageInfo = fs.readFileSync(this._packageFilePath, 'utf-8');

    return JSON.parse(packageInfo);
  }

  async _write() {
    try {
      const packageInfo = JSON.stringify(this._packageInfo, null, 2);

      fs.writeFileSync(this._packageFilePath, packageInfo, 'utf-8');
    } catch (error) {
      console.log(error);
    }
  }
}

// Let's use this since we can't have async constructors (justifiably)
export const buildPackage = (packageFilePath) => new Promise((resolve, reject) => {
  fs.readFile(packageFilePath, 'utf-8', (error, info) => {
    if (error) {
      reject(error);
      return;
    }

    const pkg = new Package(JSON.parse(info), packageFilePath);

    resolve(pkg);
  });
});
