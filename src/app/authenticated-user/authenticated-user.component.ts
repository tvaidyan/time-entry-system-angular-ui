import { Component } from '@angular/core';

@Component({
  selector: "app-authenticated-user",
  template: `<div class="mat-typography">
  <div class="container p-md-5">
    <div class="row">
        <div class="col-md-2">
        <app-navigation-menu></app-navigation-menu>
        </div>
        <div class="col-md-10">
    <router-outlet></router-outlet>
    </div>
    </div>
</div>
    </div>`
})
export class AuthenticatedUserComponent {}
