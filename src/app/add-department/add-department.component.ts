import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DepartmentService } from "../services/department.service";
import { Department } from "../models/department";

@Component({
  selector: "app-add-department",
  templateUrl: "./add-department.component.html",
  styleUrls: ["./add-department.component.css"]
})
export class AddDepartmentComponent implements OnInit {
  form: FormGroup;
  formError: string;
  submitting = false;
  private formSubmitAttempt: boolean;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      this.submitting = true;
      this.formError = null;

      let department: Department = new Department();
      let post = this.form.value;

      department.name = post.name;

      this.departmentService.create(department).subscribe(
        (createResponse: any) => {
          this.submitting = false;
          this.router.navigate(["/authenticated/departments"]);
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
