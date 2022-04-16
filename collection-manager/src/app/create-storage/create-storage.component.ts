import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Storage } from '../Storage';

@Component({
  selector: 'app-create-storage',
  templateUrl: './create-storage.component.html',
  styleUrls: ['./create-storage.component.css'],
})
export class CreateStorageComponent implements OnInit {
  public newStorage: Storage = {
    _id: '',
    storage_name: '',
    storage_type: '',
    storage_location: '',
    storage_assigned_code: ''
  };

  public warning: string;
  public loading: boolean = false;
  public success: boolean = false;
  public response: string;
  private storageSub: any = null;

  constructor(private storage: StorageService) {}

  ngOnInit(): void {  }

  onSubmit(): void {
    // // register services that comunicate with the database will be called here
    this.loading = true;
    this.storageSub = this.storage.createStorage(this.newStorage)
    .subscribe(
      (response) => {
        console.log(response);
        this.success = true;
        this.loading = false;
      },
      (error) => {
        this.warning = error.error;
      }
    )
  }

  ngOnDestroy(): void {
    if (this.storageSub) this.storageSub.unsubscribe();
  }
}
