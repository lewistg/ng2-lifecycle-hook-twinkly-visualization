import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { GenericExpressionNodeComponent } from './expressionnodes/genericexpressionnode.component';
import { ExpressionTreeComponent } from './expressiontree.component';
import { FlasherComponent } from './view/flasher.component';
import { CompoundExpressionComponent } from './expressionnodes/compoundexpressionnode.component';
import { ConnectorComponent } from './connector.component';
//import { LogControlsComponent } from './logrecordingcontrols.component';
import { LogPlaybackControlsComponent }  from './view/logplaybackcontrols/logplaybackcontrols.component';
import { NumberExpressionNodeComponent } from './expressionnodes/numberexpressionnode.component'
import { SliderComponent } from './view/logplaybackcontrols/slider.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ 
        AppComponent, 
        CompoundExpressionComponent,
        ConnectorComponent,
        ExpressionTreeComponent,
        FlasherComponent,
        GenericExpressionNodeComponent,
        //LogControlsComponent,
        LogPlaybackControlsComponent,
        NumberExpressionNodeComponent,
        SliderComponent,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
