import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Client } from "../models/client";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Client[]>("/api/clients");
  }

  getById(id: number) {
    return this.http.get<Client>("/api/clients/" + id);
  }

  create(client: Client) {
    return this.http.post("/api/clients", client);
  }

  update(client: Client) {
    return this.http.put("/api/clients", client);
  }

  delete(id: number) {
    return this.http.delete("/api/clients/" + id);
  }
}
