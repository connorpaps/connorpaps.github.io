import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserDetails } from '../UserDetails';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    public userModel: UserDetails = null;
    public warning: string;
    private userID = null;
    private userSub: any = null;
    private editSub: any = null;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit(): void {
        this.userSub = this.userService.getMyDetails().subscribe(
            (response) => {
                this.userModel = response;
                this.userID = this.userModel._id;
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //save the edited user details
    save(): void {
        //make sure the user'sa ID wasn't changed somehow
        if (this.userID && this.userID === this.userModel._id){
            this.editSub = this.userService.editUserDetails(this.userID, this.userModel).subscribe(
                (response) => {
                    console.log("saved user");
                    this.router.navigate(['/profile/me']);
                },
                (error) => {
                    this.warning = error.error;
                }
            );
        }
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.userSub) this.userSub.unsubscribe();
        if (this.editSub) this.editSub.unsubscribe();
    }
}
