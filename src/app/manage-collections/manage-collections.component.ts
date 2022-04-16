import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CollectionService } from '../collection.service';
import { Collection } from '../Collection';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Item } from '../Item';
import { ItemService } from '../item.service';


@Component({
    selector: 'app-manage-collections',
    templateUrl: './manage-collections.component.html',
    styleUrls: ['./manage-collections.component.css'],
})
export class ManageCollectionsComponent implements OnInit {
    public allCollections: Array<Collection> = [];//all of the user's collections
    public collections: Array<Collection> = [];//only ones shown (affected by search)
    public gridColumns = 3;
    public warning: string;
    public message = 'Looks like you have no collections. Click "+ Collection" to create your first one.';
    public query = "";//synced with the search bar
    public collectionCount = 0;//to display

    private collectionSub: any = null;
    private deleteCollectionSub: any = null;

    constructor(private collection: CollectionService, public dialog: MatDialog, private itemService: ItemService) { }

    ngOnInit(): void {
        //retrieve the collections of the logged in user
        this.collectionSub = this.collection.getMyCollections().subscribe(
            (response) => {
                this.allCollections = response;//all
                this.collections = response;//currently shown
                this.collectionCount = this.collections.length;
                console.log(this.collections);
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //handles collection deletion
    deleteCollection(collectionID: String): void {
        //open a dialog box, passing what's being deleted so it displays correctly
        const dialogRef = this.dialog.open(DeleteDialogComponent,{
            data: {
                deletingObject: "Collection"
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            //delete the collection if they chose yes
            if (result === "yes") {
                this.deleteCollectionSub = this.collection.removeCollection(collectionID).subscribe(
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

    //update the shown collections using the search query
    search(): void {
        //default message
        this.message = 'Looks like you have no collections. Click "+ Collection" to create your first one.';
        if (this.query == ""){
            //show all collections when there's no query
            this.collections = this.allCollections;
            return;
        }
        //clear the currently shown collections
        this.collections = [];
        //get all collections that fit the query
        for (let collection of this.allCollections){
            //add if the name includes the query (not case sensitive)
            if (collection.collection_name.toLowerCase().includes(this.query.toLowerCase())){
                this.collections.push(collection);
            }
        }
        //update the count
        this.collectionCount = this.collections.length;
        //update message if no collections were found
        if (this.collectionCount == 0){
            this.message = "No collections fit that search query. Check spelling or try a simpler query."
        }
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.collectionSub) this.collectionSub.unsubscribe();
        if (this.deleteCollectionSub) this.deleteCollectionSub.unsubscribe();
    }
}
