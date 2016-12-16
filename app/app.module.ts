import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { NodeComponent } from './componentnode.component';
import { GraphComponent } from './graph.component';
import { ConnectorComponent } from './connector.component';
import { NodePlacement } from './nodeplacement.directive';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
      AppComponent, 
      GraphComponent, 
      NodeComponent,
      ConnectorComponent,
      NodePlacement
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
