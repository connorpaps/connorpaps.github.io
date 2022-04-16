import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../RegisterUser';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUser: RegisterUser = {
    username: "",
    email: "",
    password: "",
  }

  public password2: string;
  public warning: string;
  public loading: boolean = false;
  public success: boolean = false;
  public response: string;
  private registerSub: any;

  // add auth service after
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    // // register services that comunicate with the database will be called here
    if (this. registerUser.username != "") {
      if (this.registerUser.password == this.password2) {
        this.loading = true;
        this.registerSub = this.auth.register(this.registerUser).subscribe(
          response => {
            this.success = true;
            this.warning = null;
          },
          error => {
            this.success = false;
            this.warning = error.error;
            this.loading = false;
          }
        );
      } else {
        this.warning = "Passwords don't match";
      }

    }
  }

  ngOnDestroy(): void {
    this.registerSub.unsubscribe();
  }



}


