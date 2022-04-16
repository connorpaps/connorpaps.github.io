import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '../Storage';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.css'],
})
export class EditStorageComponent implements OnInit {
  public warning: string;
  public response: string;
  private editSub: any = null;

  public storageModel: Storage = new Storage(); // synced form model
  public storageName: string = ''; // displays at top of page

  constructor(
    private routing: Router,
    private route: ActivatedRoute,
    private stoService: StorageService
  ) {}

  ngOnInit(): void {
    let id: string = this.route.snapshot.params['id'];
    this.editSub = this.stoService.getStorageById(id).subscribe(
      (response) => {
        this.storageModel = response;
        if (this.storageModel)
          this.storageName = `${this.storageModel.storage_name}`;
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  onSubmit(): void {
    this.editSub = this.stoService
      .editStorageDetails(this.storageModel)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.warning = error.error;
        }
      );
    // window.location.reload();
    this.routing.navigate(['/managestorage']);
  }

  // validation for labeling code
  onKeyPress(event: any) {
    const regexpNumber = /[0-9\ ]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

  // closes edit form
  onClose(): void {
    this.routing.navigate(['/managestorage']);
  }

  // unsubscribes upon being destroyed
  ngOnDestroy() {
    if (this.editSub) this.editSub.unsubscribe();
  }
}
