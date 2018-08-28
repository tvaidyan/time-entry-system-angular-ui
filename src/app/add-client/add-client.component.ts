import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ClientService } from "../services/client.service";
import { Client } from "../models/client";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  form: FormGroup;
  formError: string;
  submitting = false;
  private formSubmitAttempt: boolean;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
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

      let client: Client = new Client();
      let post = this.form.value;

      client.name = post.name;

      this.clientService.create(client).subscribe(
        (createResponse: any) => {
          this.submitting = false;
          this.router.navigate(["/authenticated/clients"]);
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
