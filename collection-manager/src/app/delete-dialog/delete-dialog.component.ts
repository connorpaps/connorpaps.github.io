import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
    public deleteTitle = "Delete";//default
    public deleteMessage = "Are you sure you want to delete this?";//default

    constructor(private matDialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        if (this.data && this.data.deletingObject){
            this.deleteTitle = `Delete ${this.data.deletingObject}`;
            this.deleteMessage = `Are you sure you want to delete this ${this.data.deletingObject.toLowerCase()}?`;
        }
    }

    onYesClick(): void {
        this.matDialogRef.close("yes");
    }

}
