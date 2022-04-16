import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ItemService } from '../item.service';

@Component({
  selector: 'app-add-item-image-dialog',
  templateUrl: './add-item-image-dialog.component.html',
  styleUrls: ['./add-item-image-dialog.component.css']
})
export class AddItemImageDialogComponent implements OnInit {

  constructor(private dialog: MatDialogRef<AddItemImageDialogComponent>, private itemService: ItemService, @Inject(MAT_DIALOG_DATA) data) {
    this.itemId = data.itemId;
   }

  form: any;
  image: any;
  itemId: any;
  photoSub: any;
  warning: any;
  chosen: any;

  ngOnInit(): void {
  }

  close() {
    this.dialog.close();
  }

  fileChosen(event:any) {
    if (event.target.value) {
      this.image = <File>event.target.files[0];
      this.chosen = true;
    }
  }

  upload() {
    this.form = new FormData();
    console.log(this.image);
    if (this.image) {
      this.form.append('image', this.image, this.image.name);
      this.photoSub = this.itemService.addImageToItem(this.itemId, this.form).subscribe((res) => 
      response => {
        console.log(response);
      }, error => {
        this.warning = error.error;
    }
      );
    }
    this.dialog.close();
  }

}
