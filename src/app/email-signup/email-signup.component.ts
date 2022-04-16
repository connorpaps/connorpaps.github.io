import { Component, Inject, Injectable } from '@angular/core';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-email-signup',
  templateUrl: './email-signup.component.html',
  styleUrls: ['./email-signup.component.css'],
})
export class EmailSignupComponent {
  constructor(
    private dialogRef: MatDialogRef<EmailSignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public closeMe() {
    this.dialogRef.close();
  }
}
