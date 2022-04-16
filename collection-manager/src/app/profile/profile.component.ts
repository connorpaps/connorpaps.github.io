import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollectionService } from '../collection.service';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { ListingDisplayInfo } from '../listing-display-info';
import { ListingService } from '../listing.service';
import { UserService } from '../user.service'
import { UserDetails } from '../UserDetails';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public user: UserDetails = null;
    public postings: Array<ListingDisplayInfo> = [];
    public viewingSelf = false;
    public collectionAmount = -1;//default (-1 means loading... and -2 means error)
    public warning: string;
    public gridColumns = 3;

    private itemSub: any = null
    private userSub: any = null;
    private listingSub: any = null;
    private collectionSub: any = null;

    constructor(
        private route: ActivatedRoute,
        private itemService: ItemService,
        private userService: UserService,
        private listingService: ListingService,
        private collectionService: CollectionService
    ) { }

    ngOnInit(): void {
        let id: String = this.route.snapshot.params['id'];
        //if the id is "me"...
        if (id === "me") {
            //get the logged-in user details
            this.userSub = this.userService.getMyDetails().subscribe(
                (response) => {
                    this.user = response;
                    this.viewingSelf = true;
                    this.getCollections();
                },
                (error) => {
                    this.warning = error.error;
                }
            );
        } else {
            //otherwise, retrieve the user details using the id
            this.userSub = this.userService.getUserDetails(id).subscribe(
                (response) => {
                    this.user = response;
                    this.viewingSelf = false;
                    this.getListings();
                },
                (error) => {
                    this.warning = error.error;
                }
            );
        }
    }
    
    //for only the logged in user to see when viewing themself
    getCollections(): void {
        //get number of collections
        this.collectionSub = this.collectionService.getMyCollections().subscribe(
            (collections) => {
                this.collectionAmount = collections.length;
            },
            (error) => {
                this.warning = error.error;
                this.collectionAmount = -2;
            }
        );
    }

    //for only when viewing other users
    getListings(): void {
        //get the listings of a user by id
        this.listingSub = this.listingService.getListingsByUserId(this.user._id).subscribe(
            (response) => {
                console.log(response);
                this.showListings(response);
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //converts the listings into the correct format and adds them to the displayed list if they're valid
    showListings(listings): void {
        this.postings = [];
        //if nothing was retrieved from the service
        if (!(listings && listings.length > 0)) {
            console.log("No listing for this user");
            return;
        }
        //for each market listings
        listings.forEach(listing => {
            //fix types that are stored with different names
            if (listing.listing_type == "sale") listing.listing_type = "selling";
            if (listing.listing_type == "trade") listing.listing_type = "trading";
            //1. get the linked item if it exists
            //Note: only adds listings with valid items
            if (listing.item_id){
                this.itemSub = this.itemService.getItemById(listing.item_id).subscribe(
                    (item) => {
                        //2. convert the listing into ListingDisplayInfo (passing the listing and item) and push it to the array
                        this.postings.push(new ListingDisplayInfo(listing, item));
                    },
                    (error) => {
                        this.warning = error.error;
                    }
                );
            }
        });
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.itemSub) this.itemSub.unsubscribe();
        if (this.userSub) this.userSub.unsubscribe();
        if (this.listingSub) this.listingSub.unsubscribe();
        if (this.collectionSub) this.collectionSub.unsubscribe();
    }
}
