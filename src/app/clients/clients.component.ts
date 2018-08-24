import { Component, OnInit, OnDestroy } from "@angular/core";
import { ClientService } from "../services/client.service";
import { DialogsService } from "../shared/popup-dialog/dialogs.service";
import { Client } from "../models/client";
import { Subscription } from "rxjs";

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"]
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  dataSubscription: Subscription;

  constructor(
    private clientService: ClientService,
    private dialogsService: DialogsService
  ) {}

  ngOnInit() {
    this.loadAllClients();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  private loadAllClients() {
    //reset
    this.clients = [];

    this.dataSubscription = this.clientService
      .getAll()
      .subscribe(clients => {
        this.clients = clients;
      });
  }

  async deleteclient(client: Client) {
    this.dialogsService
      .confirm(
        "Delete Client",
        "Are you sure you want to delete " +
          client.name +
          "?",
        true
      )
      .subscribe(actionConfirmed => {
        if (actionConfirmed) {
          this.clientService
            .delete(client.clientId)
            .subscribe((deleteResponse: any) => {
              this.loadAllClients();
            });
        }
      });
  }
}
