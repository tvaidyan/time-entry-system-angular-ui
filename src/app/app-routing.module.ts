import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", component: LoginComponent },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [TimeSheetComponent]
})
export class AppRoutingModule { }
