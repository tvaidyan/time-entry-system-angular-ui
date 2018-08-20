import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'popup-dialog',
    templateUrl: './popup-dialog.component.html',
    styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialog {

    public title: string;
    public message: string;
    public showCancelButton: boolean;

    constructor(public dialogRef: MatDialogRef<PopupDialog>) {

    }
}