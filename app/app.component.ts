import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hi {{name}}</h1>
    <graph [numLevels]="5"></graph>
    <node [level]="3"></node>
  `,
})
export class AppComponent  { name = 'Angular'; }
