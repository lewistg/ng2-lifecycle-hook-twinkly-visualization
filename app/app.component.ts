import { Component } from '@angular/core';

import { ComponentNodeLifecycleLog } from './componentnodelifecyclehooklog';

@Component({
  selector: 'my-app',
  template: `
    <expression-tree></expression-tree>
    <!--graph [numLevels]="5"></graph-->
    <log-controls></log-controls>
  `,
  providers: [ComponentNodeLifecycleLog]
})
export class AppComponent  {  }
