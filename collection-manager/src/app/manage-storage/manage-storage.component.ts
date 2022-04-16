import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../storage.service';
import { Storage } from '../Storage';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-manage-storage',
    templateUrl: './manage-storage.component.html',
    styleUrls: ['./manage-storage.component.css'],
})
export class ManageStorageComponent implements OnInit {
    public allStorages: Array<Storage> = [];///all of the user's storage locations
    public storageList: Array<Storage> = [];//currently shown storage locations
    public gridColumns = 3;
    public warning: string;
    public message = 'Looks like you have no storage locations. Click "+ Storage" to create your first one.';
    public query = "";
    public storageCount = 0;

    private storageSub: any = null;
    private deleteStorageSub: any = null;

    constructor(public dialog: MatDialog, private storageService: StorageService) { }

    ngOnInit(): void {
        this.storageSub = this.storageService.getStorageByUserId().subscribe(
            (response) => {
                this.allStorages = response;//all
                this.storageList = response;//currently shown
                this.storageCount = this.storageList.length;
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //handles storage location deletion
    deleteStorage(storageID: string): void {
        //open a dialog box, passing what's being deleted so it displays correctly
        const dialogRef = this.dialog.open(DeleteDialogComponent,{
            data: {
                deletingObject: "Storage Location"
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            //delete the storage location if they chose yes
            if (result === "yes") {
                this.deleteStorageSub = this.storageService.removeStorageLocation(storageID).subscribe(
                    (response) => {
                        window.location.reload();//reload the page
                    },
                    (error) => {
                        this.warning = error.error;
                    }
                );
            }
        });
    }

    //update the shown storage locations using the search query
    search(): void {
        //default message
        this.message = 'Looks like you have no storage locations. Click "+ Storage" to create your first one.';
        if (this.query == ""){
            //show all storages when there's no query
            this.storageList = this.allStorages;
            return;
        }
        //clear the currently shown storages
        this.storageList = [];
        //get all storages that fit the query
        for (let storage of this.allStorages){
            //add if the name includes the query (not case sensitive)
            if (storage.storage_name.toLowerCase().includes(this.query.toLowerCase())){
                this.storageList.push(storage);
            }
        }
        //update the count
        this.storageCount = this.storageList.length;
        //update message if no storage locations were found
        if (this.storageCount == 0){
            this.message = "No storage locations fit that search query. Check spelling and try a simpler query."
        }
    }

    //unsubscribes upon being destroyed
    ngOnDestroy(): void {
        if (this.storageSub) this.storageSub.unsubscribe();
        if (this.deleteStorageSub) this.deleteStorageSub.unsubscribe();
    }
}
