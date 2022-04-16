import { Component, OnInit } from '@angular/core';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { ListingDisplayInfo } from '../listing-display-info';
import { ListingService } from '../listing.service';

@Component({
    selector: 'app-my-listings',
    templateUrl: './my-listings.component.html',
    styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {
    public postings: Array<ListingDisplayInfo> = [];//currently shown postings
    public gridColumns = 3;
    public warning: string;
    public listingCount = 0;

    private listingSub: any = null;
    private itemSub: any = null;
    private deleteSub: any = null;

    constructor(private listingService: ListingService, private itemService: ItemService) { }

    ngOnInit(): void {
        //retrieve all postings of the logged-in user
        this.listingSub = this.listingService.getMyListings().subscribe(
            (response) => {
                this.showPostings(response);
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //converts the listings into the correct format and adds them to the displayed list if they're valid
    showPostings(listings): void {
        this.postings = [];//clear the displayed postings
        this.listingCount = listings.length;//update the count
        //if nothing was retrieved from the service
        if (!(listings && listings.length > 0)) {
            console.log("Nothing returned from listing service. Likely nothing there but may be an error.");
            return;
        }
        //for each market posting
        listings.forEach(listing => {
            //fix types that are stored with different names
            if (listing.listing_type == "sale") listing.listing_type = "selling";
            if (listing.listing_type == "trade") listing.listing_type = "trading";
            //1. get the linked item if it exists
            if(listing.listing_type == "wanted") {
                this.postings.push(new ListingDisplayInfo(listing));
            }
            else {
                if (listing.item_id){
                    this.itemSub = this.itemService.getItemById(listing.item_id).subscribe(
                        (item) => {
                            //2. convert the listing into ListingDisplayInfo (passing the listing and item) and push it to the array
                            this.postings.push(new ListingDisplayInfo(listing, item));
                        },
                        (error) => {
                            this.warning = error.error;
                            //if no item is linked, use a default item
                            let newListing = new ListingDisplayInfo(listing, new Item);
                            //give an error to display
                            newListing.error = "Error retrieving linked item. Either the item was deleted or the server has issues.";
                            this.postings.push(newListing);
                        }
                    );
                } else {
                    //if no item is linked, use a default item
                    let newListing = new ListingDisplayInfo(listing, new Item);
                    //give an error to display
                    newListing.error = "No item is linked. Delete the listing.";
                    this.postings.push(newListing);
                }
            }
        });
    }

    //delete a listing
    deleteListing(listID: String): void {
        this.deleteSub = this.listingService.deleteListing(listID).subscribe(
            (response) => {
                console.log(response);
                console.log("successfully deleted listing");
                window.location.reload();//reload the page
            },
            (error) => {
                console.log("failed deleting listing");
                this.warning = error.error;
            }
        );
    }

    //promotes a listing
    promote(id): void {
        this.listingSub = this.listingService.promoteListing(id).subscribe(
            (response) => {
                console.log("successfully promoted");
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
        if (this.deleteSub) this.deleteSub.unsubscribe();
    }
}
