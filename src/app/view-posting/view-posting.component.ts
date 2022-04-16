import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { ListingDisplayInfo } from '../listing-display-info';
import { ListingService } from '../listing.service';
import { ConversationService } from '../conversation.service';

@Component({
    selector: 'app-view-posting',
    templateUrl: './view-posting.component.html',
    styleUrls: ['./view-posting.component.css']
})
export class ViewPostingComponent implements OnInit {
    public posting: ListingDisplayInfo = null;
    public postType: String = "";
    public warning: string;
    public chatRoute: String = "/chat";//multiple html locations use this

    private listingSub: any = null;
    private itemSub: any = null;
    private conversationSub: any = null;

    constructor(private route: ActivatedRoute, private listingService: ListingService, private itemService: ItemService, private conversationService: ConversationService) { }

    ngOnInit(): void {
        let id: String = this.route.snapshot.params['id'];
        //retrieve the listing details using the id
        this.listingSub = this.listingService.getListingById(id).subscribe(
            (response) => {
                this.showPosting(response);
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //handles showing the retrieved listing
    showPosting(listing: any) {
        console.log("viewing: ", listing);
        this.posting = null;//clear the displayed posting
        //fix types that are stored with different names
        if (listing.listing_type == "sale") listing.listing_type = "selling";
        if (listing.listing_type == "trade") listing.listing_type = "trading";
        //change the displayed post type
        this.postType = listing.listing_type;
        //if nothing was retrieved from the service
        if (!listing) {
            console.log("Nothing returned from listing service. Likely nothing there but may be an error.");
            return;
        }
        //1. get the item instance it's linked to (using the field item_id)
        if (listing.item_id) {
            this.itemSub = this.itemService.getItemById(listing.item_id).subscribe(
                (item) => {
                    //2. convert the listing into PostingViewInfo (passing the listing and item) and set the shown posting
                    this.posting = new ListingDisplayInfo(listing, item);
                },
                (error) => {
                    this.warning = error.error;
                }
            );
        } else {
            //if there's no linked image, send an empty image
            let temp = new Item;
            this.posting = new ListingDisplayInfo(listing, temp);
        }
    }

    notifyUser(id: String) {
        this.conversationSub = this.conversationService.createConversation(id).subscribe(
            (response) => {
                // console.log(response);
            },
            (error) => {
              this.warning = error.error;
            }
          );
    }

    //unsubscribes upon being destroyed
    ngOnDestroy() {
        if (this.listingSub) this.listingSub.unsubscribe();
        if (this.itemSub) this.itemSub.unsubscribe();
    }
}