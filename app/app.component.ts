import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <graph [numLevels]="5"></graph>
  `,
})
export class AppComponent  {  }
