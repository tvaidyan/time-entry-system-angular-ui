import { Component, OnInit, OnDestroy } from "@angular/core";
import { DepartmentService } from "../services/department.service";
import { DialogsService } from "../shared/popup-dialog/dialogs.service";
import { Department } from "../models/department";
import { Subscription } from "rxjs";

@Component({
  selector: "app-departments",
  templateUrl: "./departments.component.html",
  styleUrls: ["./departments.component.css"]
})
export class DepartmentsComponent implements OnInit, OnDestroy {
  departments: Department[] = [];
  dataSubscription: Subscription;

  constructor(
    private departmentService: DepartmentService,
    private dialogsService: DialogsService
  ) {}

  ngOnInit() {
    this.loadAllDepartments();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  private loadAllDepartments() {
    //reset
    this.departments = [];

    this.dataSubscription = this.departmentService
      .getAll()
      .subscribe(departments => {
        this.departments = departments;
      });
  }

  async deleteDepartment(department: Department) {
    // TODO: check to see there are employees or other related records
    this.dialogsService
      .confirm(
        "Delete Department",
        "Are you sure you want to delete " +
          department.name +
          "?",
        true
      )
      .subscribe(actionConfirmed => {
        if (actionConfirmed) {
          this.departmentService
            .delete(department.departmentId)
            .subscribe((deleteResponse: any) => {
              this.loadAllDepartments();
            });
        }
      });
  }
}
