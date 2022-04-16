import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Collection } from '../Collection';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { CollectionService } from '../collection.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-view-collection',
    templateUrl: './view-collection.component.html',
    styleUrls: ['./view-collection.component.css']
})
export class ViewCollectionComponent implements OnInit {
    public allItems: Array<Item> = [];//all of the collection's items
    public items: Array<Item> = [];//only ones shown (affected by search)
    public collectionDetails: Collection = new Collection;//for some info
    public gridColumns = 3;
    public warning: string;
    public message = 'Looks like this collection has no items. Click "+ Item" to add your first one.'
    public query = "";//synced with the search bar
    public itemCount = 0;//to display

    private itemSub: any = null;
    private collectionSub: any = null;
    private deleteItemSub: any = null;

    constructor(private itemService: ItemService, private collectionService: CollectionService, private route: ActivatedRoute, public dialog: MatDialog) { }


    ngOnInit(): any {
        let id: String = this.route.snapshot.params['id'];
        //retrieve all the items in the collection
        this.itemSub = this.itemService.getAllItemsByCollectionId(id).subscribe(
            (response) => {
                this.allItems = response;//all
                this.items = response;//currently shown
                this.itemCount = this.items.length;
            },
            (error) => {
                this.warning = error.error;
            }
        )
        //retrieve the collection details
        this.collectionSub = this.collectionService.getCollectionById(id).subscribe(
            (response) => {
                this.collectionDetails = response;
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //handles item deletion
    deleteItem(itemID: String): void {
        //open a dialog box, passing what's being deleted so it displays correctly
        const dialogRef = this.dialog.open(DeleteDialogComponent,{
            data: {
                deletingObject: "Item"
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            //delete the item if they chose yes
            if (result === "yes") {
                this.deleteItemSub = this.itemService.removeItem(itemID).subscribe(
                    (response) => {
                        window.location.reload();//reload the page
                    },
                    (error) => {
                        this.warning = error.error;
                    }
                );
            }
        });
    }

    //update the shown items using the search query
    search(): void {
        //default message
        this.message = 'Looks like this collection has no items. Click "+ Item" to add your first one.';
        if (this.query == "") {
            //show all items when there's no query
            this.items = this.allItems;
            return;
        }
        //clear the currently shown items
        this.items = [];
        //get all items that fit the query
        for (let item of this.allItems) {
            //add if the name includes the query (not case sensitive)
            if (item.item_title.toLowerCase().includes(this.query.toLowerCase())) {
                this.items.push(item);
            }
        }
        //update the count
        this.itemCount = this.items.length;
        //update message if no items were found
        if (this.itemCount == 0){
            this.message = "No items fit that search query. Check spelling and try a simpler query."
        }
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.itemSub) this.itemSub.unsubscribe();
        if (this.collectionSub) this.collectionSub.unsubscribe();
        if (this.deleteItemSub) this.deleteItemSub.unsubscribe();
    }
}
