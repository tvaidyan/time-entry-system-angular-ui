import { Observable } from 'rxjs';
import { PopupDialog } from './popup-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogsService {

    constructor(private dialog: MatDialog) { }

    public confirm(title: string, message: string, showCancelButton: boolean): Observable<boolean> {

        let dialogRef: MatDialogRef<PopupDialog>;

        dialogRef = this.dialog.open(PopupDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.showCancelButton = showCancelButton;

        return dialogRef.afterClosed();
    }
}