// https://stackoverflow.com/questions/34489916/how-to-load-external-scripts-dynamically-in-angular/42766146#42766146

import { Injectable } from '@angular/core';
interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  { name: 'intlTelInput', src: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js' },
];

@Injectable({
  providedIn: 'root'
})

export class ScriptService {
  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({script: name, loaded: true, status: 'Already Loaded'});
      } else {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
          console.log(`${name} Loaded.`);
          resolve({script: name, loaded: true, status: 'Loaded'});
        };
        script.onerror = (error: any) => reject({script: name, loaded: false, status: 'Failed'});
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }
}
