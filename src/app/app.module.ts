import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';

import { SensorGraphsComponent } from './sensor-graphs/sensor-graphs.component';
import { HttpClientModule } from '@angular/common/http';
import { SensorValuesComponent } from './sensor-values/sensor-values.component';
import { SensorValueComponent } from './sensor-value/sensor-value.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    SensorGraphsComponent,
    SensorValuesComponent,
    SensorValueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
