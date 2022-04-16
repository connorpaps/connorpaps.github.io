import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Collection } from '../Collection';
import { CollectionService } from '../collection.service';

@Component({
    selector: 'app-edit-collection',
    templateUrl: './edit-collection.component.html',
    styleUrls: ['./edit-collection.component.css'],
})
export class EditCollectionComponent implements OnInit {
    collectionModel: Collection = null;
    public warning: string;
    public loading: boolean = false;
    private collectionSub: any;
    private editSub: any;

    constructor(private routing: Router, private route: ActivatedRoute, private colService: CollectionService) { }

    ngOnInit(): void {
        let id: String = this.route.snapshot.params['id'];
        this.collectionSub = this.colService.getMyCollections().subscribe(
            response => {
                //get the correct collection from the array of user collections
                response.every(col => {
                    if (col._id == id){
                        this.collectionModel = col;
                        //console.log("collections:", this.collectionModel);
                        return false;
                    }
                    return true;
                });
            }, error => {
                this.warning = error.error;
            }
        )
    }

    onSubmit(): void {
        
      //console.log("Changing collection to:", this.collectionModel);
        this.editSub = this.colService.editCollection(this.collectionModel).subscribe(
            response => {
                //console.log(response);
            }, error => {
                this.warning = error.error;
            }
        );
        this.routing.navigate(['/managecollections']);
    }

    onCloseCollection(): void {
        this.routing.navigate(['/managecollections']);
    }

    //unsubscribes upon being destroyed
    ngOnDestroy() {
        if (this.collectionSub) this.collectionSub.unsubscribe();
    }
}