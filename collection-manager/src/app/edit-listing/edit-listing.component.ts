import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  public listingModel: Listing = new Listing;
  public listingName: string = ""; 
  private editSub: any = null;
  public warning: string;  
  public response: string;  

  constructor(private routing: Router, private route: ActivatedRoute, private listingService: ListingService) { }

  ngOnInit(): void {
    let id: string = this.route.snapshot.params['id'];
    this.editSub = this.listingService.getListingById(id).subscribe(
      (response) => {
        console.log(response);
        this.listingModel = response;       
        if (this.listingModel) this.listingName = `${this.listingModel.listing_name}`;
      }, (error) => {
          this.warning = error.error;
      }
    )
  }

  onSubmit(): void { 
    this.editSub = this.listingService.modifyListing(this.listingModel).subscribe(
          (response) => {
              console.log(response); 
          }, error => {
              this.warning = error.error;
          }
      );
      this.routing.navigate(['/mylistings']);    
  }

  onKeyPress(event: any) {
    const regexpNumber = /[0-9\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

  onClose(): void {
    this.routing.navigate(['/mylistings']);
  }

  ngOnDestroy() {
    if (this.editSub) this.editSub.unsubscribe();
  }
}
