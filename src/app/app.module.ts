import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';  // <-- #1 import module
import {ReactiveFormsModule} from '@angular/forms';  // <-- #1 import module

import {AppComponent} from './app.component';
import {DraggableModule} from './draggable/draggable.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        DraggableModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
