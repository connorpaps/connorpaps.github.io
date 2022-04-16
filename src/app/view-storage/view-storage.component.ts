import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Collection } from '../Collection';
import { CollectionService } from '../collection.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { StorageService } from '../storage.service';
import { Storage } from '../Storage';

@Component({
  selector: 'app-view-storage',
  templateUrl: './view-storage.component.html',
  styleUrls: ['./view-storage.component.css'],
})
export class ViewStorageComponent implements OnInit {
  public allItems: Array<Item> = []; //all of the collection's items
  public items: Array<Item> = []; //only ones shown (affected by search)
  public collectionDetails: Collection = new Collection(); //for some info
  public gridColumns = 3;
  public warning: string;
  public message = 'Looks like this storage box has no items.';
  public query = ''; //synced with the search bar
  public itemCount = 0; //to display
  public allCollections: Array<Collection> = []; //all of the user's collections
  public collections: Array<Collection> = []; //only ones shown (affected by search)

  public storageModel: Storage = new Storage(); // synced form model
  public storageName: string = ''; // displays at top of page
  public storageCode: string = '';
  private itemSub: any = null;
  private storageSub: any = null;
  private collectionSub: any = null;
  private deleteItemSub: any = null;
  private editSub: any = null;

  constructor(
    private itemService: ItemService,
    private storageService: StorageService,
    private collectionService: CollectionService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private collection: CollectionService
  ) {}

  ngOnInit(): void {
    // get the storage information
    let id: string = this.route.snapshot.params['id'];
    this.editSub = this.storageService.getStorageById(id).subscribe(
      (response) => {
        this.storageModel = response;
        if (this.storageModel)
          this.storageName = `${this.storageModel.storage_name}`;
      },
      (error) => {
        this.warning = error.error;
      }
    );
    this.storageCode = this.storageModel.storage_assigned_code;
    console.log('storage code:' + this.storageCode);

    // get collections
    //retrieve the collections of the logged in user
    this.collectionSub = this.collection.getMyCollections().subscribe(
      (response) => {
        this.allCollections = response; //all
        this.collections = response; //currently shown
        console.log(this.collections);
      },
      (error) => {
        this.warning = error.error;
      }
    );
    console.log('asd');

    /*
    //retrieve all the items that match the storage id
    this.storageSub = this.storageService
      .getItemsInStorageByCode(this.storageModel.storage_assigned_code)
      .subscribe(
        (response) => {
          this.allItems = response;
          this.items = response;
          this.itemCount = this.items.length;
        },
        (error) => {
          this.warning = error.error;
        }
      );
      */
  }

  loadItems(): void {
    console.log(this.storageModel.storage_assigned_code);
    this.allCollections.forEach((collection) => {
      console.log('asdasd');
      let currCollectionId = collection.collection_user_id;
      console.log('hello');
      //retrieve all the items in the collection
      this.itemSub = this.itemService
        .getAllItemsByCollectionId(currCollectionId)
        .subscribe(
          (response) => {
            console.log('tyes');
            let currItems: Array<Item>;
            currItems = response; //all
            currItems.forEach((item) => {
              console.log(item.storage_object_id);
            });
            console.log(currItems);
          },
          (error) => {
            this.warning = error.error;
          }
        );
    });
  }
}
