import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AddItemImageDialogComponent } from '../add-item-image-dialog/add-item-image-dialog.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { Item } from '../Item';
import { ItemService } from '../item.service';

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
    public warning: string;
    private editSub: any;
    public itemModel: Item = new Item;//synced form model
    public itemName: string = "";//displays at top of page

    constructor(private routing: Router, private route: ActivatedRoute, private itemService: ItemService, private dialog: MatDialog) { }

    id: String;
    images = [];

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.editSub = this.itemService.getItemById(this.id).subscribe(
            (response) => {
                this.itemModel = response;
                if (this.itemModel) this.itemName = `${this.itemModel.item_title}`;
                for (let i:any = 0; i < this.itemModel.item_images.length; i++) {
                    this.images.push(this.itemModel.item_images[i]);
                }
                console.log("item:", this.itemModel);
                console.log(this.images);
            }, (error) => {
                this.warning = error.error;
            }
        )
    }

    onSubmit(): void {
        //send to editItem
        console.log("Sending:", this.itemModel);
        this.editSub = this.itemService.editItem(this.itemModel).subscribe(
            response => {
                console.log(response);
            }, error => {
                this.warning = error.error;
            }
        );
        this.routing.navigate([`/viewcollection/${this.itemModel.containing_collection_id}`]);
    }

    onClose(): void {
        this.routing.navigate(['/managecollections']);
    }

    //unsubscribes upon being destroyed
    ngOnDestroy() {
        if (this.editSub) this.editSub.unsubscribe();
    }

    addImage() : any {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            itemId: this.id
        };
        this.dialog.open(AddItemImageDialogComponent, dialogConfig);
    }
}
