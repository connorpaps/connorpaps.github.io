import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserDetails } from '../UserDetails';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    public users:Array<UserDetails> = [];//currently showing
    public warning: string;
    public gridColumns = 4;
    public messageTitle = "";
    public message = "";
    public query = "";
    public userCount = 0;
    private userSub: any = null;

    constructor(private userService:UserService) { }

    ngOnInit(): void {
        //default message
        this.messageTitle = "Search Users"
        this.message = "Users that fit your query will appear below";
    }

    //update the shown users using the search query
    search(): void {
        if (this.query.length == 0){
            this.messageTitle = "Search Users"
            this.message = "Please provide a query before searching";
            return;
        }
        this.messageTitle = "Searching..."
        this.message = "Users that fit your query will appear below";
        //get all users that fit the query
        this.userSub = this.userService.findUser(this.query).subscribe(
            (response) => {
                this.users = response;
                //update the count
                this.userCount = this.users.length;
                //update the message depending on whether there were any returned users
                if (this.userCount == 0){
                    this.messageTitle = "No Users";
                    this.message = "No users fit that search query. Check spelling or try a simpler query."
                } else {
                    this.messageTitle = "Search Users";
                    this.message = "Users that fit your query will appear below";
                }
            },
            (error) => {
                this.warning = error.error;
                //update message when there's an error (back to default)
                this.messageTitle = "Search Users";
                this.message = "Users that fit your query will appear below";
            }
        );
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.userSub) this.userSub.unsubscribe();
    }
}
