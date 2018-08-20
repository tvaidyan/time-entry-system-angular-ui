import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { map } from "rxjs/operators";

import { Employee } from "../models/Employee"
import { EmployeeService } from "../services/employee.service"
import { DepartmentService } from '../services/department.service';
import { Department } from '../models/Department';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  formError: string;
  submitting = false;
  departments: Department[] = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {
    this.form = this.fb.group({
      firstName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ],
      lastName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ],
      email: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
        Validators.composeAsync([this.emailAddressUnique.bind(this)])
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(PASSWORD_REGEX)
        ]),
      ],
      department: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  private loadDepartments() {
    // reset
    this.departments = [];

    this.departmentService.getAll().subscribe((departments: Department[]) => {
      this.departments = departments;
    });
  }

  //check to see if the new email address entered is already in the system
  emailAddressUnique(c: FormControl) {
    let emailAddressAlreadyExists: boolean = false;

    //get list of current categories from the server.
    return this.employeeService.getAll().pipe(
      map(items => {
        for (let item of items) {
          if (item.email.toUpperCase() == c.value.toUpperCase()) {
            emailAddressAlreadyExists = true;
            break;
          }
        }

        if (emailAddressAlreadyExists) {
          //email address is not unique
          return { emailAddressUnique: false };
        }

        //no error
        return null;
      })
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitting = true;
      this.formError = null;

      let post = this.form.value;

      let newEmployee: Employee = new Employee();
      newEmployee.email = post.email;
      newEmployee.firstName = post.firstName;
      newEmployee.lastName = post.lastName;
      newEmployee.password = post.password;
      newEmployee.departmentId = post.department;

      this.employeeService.create(newEmployee).subscribe(
        () => {
          this.router.navigate(["/authenticated/employees"]);
          
          // if (createResponse.CreateSucceeded) {
          //   this.router.navigate(["/admin/authenticated/employees"]);
          // } else {
          //   this.formError = "Error: " + createResponse.ErrorMessage;
          //   this.submitting = false;
          // }
        },
        err => {
          this.submitting = false;
          console.error("got error: ", err);
          this.formError = err;
        }
      );
    }
  }

}