import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from "./runtime/app.module-jit";
import {enableProdMode} from '@angular/core';

import {Tis} from './environments/environment';
//
if (Tis.environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
