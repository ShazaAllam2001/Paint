import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ToolBoxComponent } from './tool-box/tool-box.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StyleBoxComponent } from './style-box/style-box.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    CanvasComponent,
    ToolBoxComponent,
    NavBarComponent,
    StyleBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
