import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { NodeComponent } from './componentnode.component';
import { GenericExpressionNodeComponent } from './expressionnodes/genericexpressionnode.component';
import { ExpressionTreeComponent } from './expressiontree.component';
import { CompoundExpressionComponent } from './expressionnodes/compoundexpressionnode.component';
import { GraphComponent } from './graph.component';
import { ConnectorComponent } from './connector.component';
import { LogControlsComponent } from './logrecordingcontrols.component';
import { NumberExpressionNodeComponent } from './expressionnodes/numberexpressionnode.component'

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
        AppComponent, 
        CompoundExpressionComponent,
        ConnectorComponent,
        GenericExpressionNodeComponent,
        ExpressionTreeComponent,
        GraphComponent, 
        LogControlsComponent,
        NodeComponent,
        NumberExpressionNodeComponent 
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
