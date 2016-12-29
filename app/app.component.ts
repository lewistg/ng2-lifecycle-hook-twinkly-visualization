import { Component } from '@angular/core';

import { FlashLog } from './model/flashlog';

@Component({
  selector: 'my-app',
  template: `
    <expression-tree></expression-tree>
    <!--graph [numLevels]="5"></graph-->
    <!--log-controls></log-controls-->
  `,
  providers: [FlashLog]
})
export class AppComponent  {  }
