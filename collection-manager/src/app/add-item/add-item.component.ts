import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../collection.service';
import { ItemService } from '../item.service';
import { NewItem } from '../newItem';

@Component({
    selector: 'app-add-item',
     templateUrl: './add-item.component.html',
     styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
    public itemModel: NewItem = new NewItem;//synced form model
    public collectionName:string = "Collection Name";
    public warning: string;
    private collectionID = null;

    private itemSub: any = null;
    private collectionSub: any = null;

    constructor(
        private routing: Router,
        private itemService: ItemService,
        private route: ActivatedRoute,
        private collectionService: CollectionService) {
    }

    ngOnInit(): void { 
        this.collectionID = this.route.snapshot.params['id'];//parent collection id
        //get collection to get its name
        this.collectionSub = this.collectionService.getCollectionById(this.collectionID).subscribe(
            response => {
                console.log(response);
                this.collectionName = response.collection_name;
            }, error => {
                this.warning = error.error;
            }
        );
    }

    onSubmit(): void {
        //fill out the rest of the NewItem attributes
        //this.itemModel.item_image.item_image_alt_text = `Image for ${this.itemModel.item_title}`;
        
        //add the item to the collection
        this.itemModel.containing_collection_id = this.collectionID;//set the collection parent
        console.log("Sending:", this.itemModel);
        this.itemSub = this.itemService.addItem(this.itemModel).subscribe(
            response => {
                console.log(response);
            }, error => {
                this.warning = error.error;
            }
        );
        this.routing.navigate(['/managecollections']);
    }

    onClose(): void {
        this.routing.navigate(['/managecollections']);
    }

    //unsubscribes upon being destroyed
    ngOnDestroy() {
        if (this.itemSub) this.itemSub.unsubscribe();
        if (this.collectionSub) this.collectionSub.unsubscribe();
    }
}
