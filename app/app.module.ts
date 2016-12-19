import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { NodeComponent } from './componentnode.component';
import { GraphComponent } from './graph.component';
import { ConnectorComponent } from './connector.component';
import { LogControlsComponent } from './logrecordingcontrols.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
        AppComponent, 
        ConnectorComponent,
        GraphComponent, 
        LogControlsComponent,
        NodeComponent,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
