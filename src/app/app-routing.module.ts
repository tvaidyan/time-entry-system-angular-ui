import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { AuthGuard } from './services/auth-guard.service';
import { DepartmentsComponent } from './departments/departments.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';

const routes: Routes = [

  { path: "login", component: LoginComponent },
  {
    path: "authenticated",
    component: AuthenticatedUserComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "calendar", pathMatch: "full" },
      { path: "calendar", component: CalendarComponent },
      { path: "time-sheet", component: TimeSheetComponent },
      { path: "employees", component: EmployeesComponent },
      { path: "add-employee", component: AddEmployeeComponent },
      { path: "edit-employee/:id", component: EditEmployeeComponent },
      { path: "departments", component: DepartmentsComponent },
      { path: "add-department", component: AddDepartmentComponent },
      { path: "edit-department/:id", component: EditDepartmentComponent },
      { path: "clients", component: ClientsComponent },
      {
        path: "add-client",
        component: AddClientComponent
      },
      {
        path: "edit-client/:id",
        component: EditClientComponent
      }
    ]
  },
  { path: "", component: LoginComponent },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [TimeSheetComponent]
})
export class AppRoutingModule { }
