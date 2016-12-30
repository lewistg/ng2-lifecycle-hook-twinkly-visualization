import { Component } from '@angular/core';

import { FlashLog } from './model/flashlog';
import { FlashLogPlayback } from './model/flashlogplayback';

@Component({
  selector: 'my-app',
  template: `
    <expression-tree></expression-tree>
    <log-playback-controls></log-playback-controls>
    <!--graph [numLevels]="5"></graph-->
    <!--log-controls></log-controls-->
  `,
  providers: [FlashLog, FlashLogPlayback]
})
export class AppComponent  {  }
