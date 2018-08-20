import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  formError: string;
  submitting = false;
  
  email: string;
  password: string;
  captcha: string;

  public creds = {
    username: "",
    password: "",
    captcha: ""
  };

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(signInForm: NgForm) {
    if (signInForm.valid) {
      this.submitting = true;
      this.formError = null;

      this.creds.username = signInForm.value.email;
      this.creds.password = signInForm.value.password;

      this.loginService.login(this.creds).subscribe(
        (success: boolean) => {
          if (success) {
            this.router.navigate(["/authenticated/calendar"]);
          }
        },
        (err: any) => {
          this.submitting = false;
          console.error("got error: ", err);
          this.formError = "Login failed. Please try again.";

          //clear input fields
          this.email = null;
          this.password = null;
        }
      );
    }
  }
}
