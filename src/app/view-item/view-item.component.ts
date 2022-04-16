import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Collection } from '../Collection';
import { CollectionService } from '../collection.service';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CustomFieldDialogComponent } from '../custom-field-dialog/custom-field-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { TemplateService } from '../template.service';
import { Template } from '../Template';
import { CustomField } from '../CustomField';
import { AddTemplateDialogComponent } from '../add-template-dialog/add-template-dialog.component';
import { Storage } from '../Storage';
import { StorageService } from '../storage.service';

export interface DialogData {
  key: String;
  value: String;
}

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css'],
})
export class ViewItemComponent implements OnInit {
  public item: Item = new Item();
  public collectionDetails: Collection = new Collection();
  public warning: string;
  private itemSub: any;
  private collectionSub: any;
  private addFieldSub: any;
  private deleteSub: any;
  private storageSub: any;
  private templateSub: any;
  public template = new Template();
  public customField: CustomField = new CustomField();
  public itemStorage: Storage = null;
  public storages: Array<Storage> = [];
  key: String;
  value: String;
  images: any = [];

  constructor(
    private routing: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private collectionService: CollectionService,
    public dialog: MatDialog,
    private templateService: TemplateService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    let id: String = this.route.snapshot.params['id'];
    this.itemSub = this.itemService.getItemById(id).subscribe(
      (response) => {
        this.item = response;
        //get images
        for (let i: any = 0; i < response.item_images.length; i++) {
          this.images.push(response.item_images[i]);
        }
        console.log(this.item);
        //get collections to show the parent collection name
        this.collectionSub = this.collectionService
          .getCollectionById(this.item.containing_collection_id)
          .subscribe(
            (response) => {
              this.collectionDetails = response;
            },
            (error) => {
              this.warning = error.error;
            }
          );
        //get storage box
        this.storageSub = this.storageService
          .getStorageById(this.item.storage_object_id)
          .subscribe(
            (response) => {
              this.itemStorage = response;
            },
            (error) => {
              this.warning = error.error;
            }
          );
      },
      (error) => {
        this.warning = error.error;
      }
    );
    //get template
    if (this.item.template_object_id != null) {
      this.templateSub = this.templateService.getTemplateById(id).subscribe(
        (response) => {
          console.log(response);
          this.template = response;
          this.template.template_type =
            this.template.template_type[0].toUpperCase() +
            this.template.template_type.substring(1).toLowerCase();
        },
        (error) => {
          this.warning = error.error;
          console.log(error);
        }
      );
    }
    //get storages to display in drop down menu
    //only needed when the item has no storage though
    this.storageSub = this.storageService.getStorageByUserId().subscribe(
      (response) => {
        console.log(response);
        this.storages = response;
      },
      (error) => {
        this.warning = error.error;
      }
    );
    console.log('orinting items');
    console.log(this.item);
  }

  onEdit(): void {
    this.routing.navigate([`/edititem/${this.item._id}`]);
  }

  addToStorage(): void {
    //add the item to a storage
    console.log('selected:', this.itemStorage);
    console.log('item:', this.item);
    this.storageSub = this.storageService
      .addItemToStorage(this.itemStorage._id, this.item._id)
      .subscribe(
        (response) => {
          //set the item's storage id to the selected one
          this.item.storage_object_id = this.itemStorage._id;
          this.itemSub = this.itemService.editItem(this.item).subscribe(
            (response) => {
              window.location.reload();
            },
            (error) => {
              this.warning = error.error;
            }
          );
        },
        (error) => {
          this.warning = error.error;
        }
      );
  }

  //handles item deletion
  deleteItem(): void {
    //open a dialog box, passing what's being deleted so it displays correctly
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        deletingObject: 'Item',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      //delete the item if they chose yes
      if (result === 'yes') {
        this.deleteSub = this.itemService.removeItem(this.item._id).subscribe(
          (response) => {
            this.routing.navigate(['/managecollections']);
          },
          (error) => {
            this.warning = error.error;
          }
        );
      }
    });
  }

  //handles the addition of custom fields
  addCustomField(id: String): void {
    const dialogRef = this.dialog.open(CustomFieldDialogComponent, {
      width: '250px',
      data: { key: this.key, value: this.value },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != 'close') {
        this.customField = result;
        this.addFieldSub = this.itemService
          .addCustomField(id, this.customField)
          .subscribe(
            (response) => {
              console.log(response);
              window.location.reload();
            },
            (error) => {
              this.warning = error.error;
            }
          );
      }
    });
  }

  addTemplate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      itemId: this.item._id,
    };
    dialogConfig.width = '25%';
    this.dialog.open(AddTemplateDialogComponent, dialogConfig);
  }

  //unsubscribes upon being destroyed
  ngOnDestroy() {
    if (this.itemSub) this.itemSub.unsubscribe();
    if (this.collectionSub) this.collectionSub.unsubscribe();
    if (this.addFieldSub) this.addFieldSub.unsubscribe();
    if (this.deleteSub) this.deleteSub.unsubscribe();
    if (this.storageSub) this.storageSub.unsubscribe();
    if (this.templateSub) this.templateSub.unsubscribe();
    if (this.addFieldSub) this.addFieldSub.unsubscribe();
  }
}
