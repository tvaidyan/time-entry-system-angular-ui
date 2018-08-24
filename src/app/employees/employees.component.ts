import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Employee } from "../models/employee";
import { EmployeeService } from "../services/employee.service";
import { LoginService } from "../services/login.service";
import { DialogsService } from "../shared/popup-dialog/dialogs.service";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  dataSubscription: Subscription;

  constructor(
    private employeeService: EmployeeService,
    private dialogsService: DialogsService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loadAllEmployees();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  private loadAllEmployees() {
    //reset
    this.employees = [];

    this.dataSubscription = this.employeeService
      .getAll()
      .subscribe(employees => {
        this.employees = employees;
      });
  }

  async deleteEmployee(employee: Employee) {
    //check to see if employee is trying delete himself/herself, which is not allowed
    let loggedInEmployeeId = await this.loginService.getLoggedInUser().id;

    if (loggedInEmployeeId) {
      if (employee.id == loggedInEmployeeId) {
        this.dialogsService
          .confirm(
            "Error",
            "You cannot delete the account that you are currently logged in as.",
            false
          )
          .subscribe(actionConfirmed => {});
      } else {
        this.dialogsService
          .confirm(
            "Delete Employee",
            "Are you sure you want to delete the account for " +
              employee.firstName +
              " " +
              employee.lastName +
              "?",
            true
          )
          .subscribe(actionConfirmed => {
            if (actionConfirmed) {
              this.employeeService
                .delete(employee.id)
                .subscribe((deleteResponse: any) => {
                  this.loadAllEmployees();
                });
            }
          });
      }
    }
  }
}
