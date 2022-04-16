import { Component, OnInit } from '@angular/core';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { ListingDisplayInfo } from '../listing-display-info';
import { ListingService } from '../listing.service';

@Component({
    selector: 'app-market',
    templateUrl: './market.component.html',
    styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
    public postings: Array<ListingDisplayInfo> = [];//currently shown postings
    public postType: String = "selling";//currently displayed type: mine, selling, wanted, or trading
    public gridColumns = 3;
    public warning: string;
    public query: String = "watch";//search bar text
    public listingCount = 0;

    private listingSub: any = null;
    private itemSub: any = null;

    constructor(private listingService: ListingService, private itemService: ItemService) { }

    ngOnInit(): void {
        this.showSellingPostings();//default
    }

    //changes the posting type that is shown
    //called by showSellingPostings, showWantedPostings, and showTradingPostings
    showPostings(listings: any, type: String): void {
        this.postings = [];//clear the displayed postings
        this.listingCount = 0;//reset the count
        this.postType = type;//change type of postings being displayed
        //add class "type-selected" to selected posting type only (they all must also have class selector)
        document.getElementById("option-selling").className = `selector ${(type == "selling") ? " type-selected" : ""}`;
        document.getElementById("option-wanted").className = `selector ${(type == "wanted") ? " type-selected" : ""}`;
        document.getElementById("option-trading").className = `selector ${(type == "trading") ? " type-selected" : ""}`;
        //if nothing was retrieved from the service
        if (!(listings && listings.length > 0)) {
            console.log("Nothing returned from listing service. Likely nothing there but may be an error.");
            return;
        }
        //for each market posting
        listings.forEach(listing => {
            //Note: listings with an invalid item linked won't be shown
            //1. get the linked item if it exists
            if (listing.listing_type == "wanted") {
                this.postings.push(new ListingDisplayInfo(listing));
                this.listingCount++;
            }
            else {
                if (listing.item_id) {
                    this.itemSub = this.itemService.getItemById(listing.item_id).subscribe(
                        (item) => {
                            //2. convert the listing into ListingDisplayInfo (passing the listing and item) and push it to the array
                            this.postings.push(new ListingDisplayInfo(listing, item));
                            this.listingCount++;//increase the count
                        },
                        (error) => {
                            this.warning = error.error;
                        }
                    );
                }
            }
        });
    }

    //called when the user clicks "Selling" (span element with id option-selling)
    showSellingPostings(): void {
        //retrieve all selling postings
        this.listingSub = this.listingService.getAllSellingListings().subscribe(
            (response) => {
                this.showPostings(response, "selling");
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //called when the user clicks "Wanted" (span element with id option-wanted)
    showWantedPostings(): void {
        //retrieve all wanted postings
        this.listingSub = this.listingService.getAllWantedListings().subscribe(
            (response) => {
                this.showPostings(response, "wanted");
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //called when the user clicks "Trading" (span element with id option-trading)
    showTradingPostings(): void {
        //retrieve all trading postings
        this.listingSub = this.listingService.getAllTradingListings().subscribe(
            (response) => {
                this.showPostings(response, "trading");
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
