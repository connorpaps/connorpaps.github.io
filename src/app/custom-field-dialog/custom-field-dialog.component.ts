import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../view-item/view-item.component';

@Component({
  selector: 'app-custom-field-dialog',
  templateUrl: './custom-field-dialog.component.html',
  styleUrls: ['./custom-field-dialog.component.css']
})
export class CustomFieldDialogComponent implements OnInit {

  key : String;
  value: String;

  constructor(private matDialogRef: MatDialogRef<CustomFieldDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.matDialogRef.close("close");
  }
}
