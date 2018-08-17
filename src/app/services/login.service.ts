import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { tap } from "rxjs/operators";
import { User } from "../models/user";
import { of } from "rxjs";

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  public login(creds: any) {
    // return this.http
    //   .post(
    //     "/api/token",
    //     `username=${creds.username}&password=${creds.password}&captcha=${
    //       creds.captcha
    //     }&grant_type=password`
    //   )
    //   .pipe(
    //     tap((response: any) => {
    //       this.setSession(response);
    //       return true;
    //     })
    //   );
    return of(true);
  }

  private setSession(authResult: any) {
    const expiresAt = moment(authResult[".expires"]);
    localStorage.setItem("id_token", authResult.acccess_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("firstName", authResult["firstName"]);
    localStorage.setItem("lastName", authResult["lastName"]);
    localStorage.setItem("userName", authResult["userName"]);
    localStorage.setItem("id", authResult["id"]);
  }

  logout() {
    return this.http.get("/api/account/logout").pipe(
      tap((response: any) => {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("userName");
        localStorage.removeItem("id");

        return true;
      })
    );
  }

  public isLoggedIn() {
    // return moment().isBefore(this.getExpiration());
    console.log("fake logged-in");
    return true;
  }

  public getLoggedInUser(): User {
    if (this.isLoggedIn()) {
      let curUser = new User();
      curUser.email = localStorage.getItem("userName");
      curUser.firstName = localStorage.getItem("firstName");
      curUser.lastName = localStorage.getItem("lastName");
      curUser.id = localStorage.getItem("id");
      return curUser;
    }
    return new User();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
