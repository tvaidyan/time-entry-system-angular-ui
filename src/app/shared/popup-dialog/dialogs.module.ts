
import { DialogsService } from './dialogs.service';
import { MatDialogModule, MatButtonModule  } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { PopupDialog } from './popup-dialog.component';
import { SafeHtml } from '../safe-html.pipe'

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
        CommonModule,
        BrowserModule
    ],
    exports: [
        PopupDialog,
    ],
    declarations: [
        PopupDialog,
        SafeHtml
    ],
    providers: [
        DialogsService,
    ],
    entryComponents: [
        PopupDialog,
    ],
})
export class DialogsModule { }