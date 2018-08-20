import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Employee } from "../models/Employee";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Employee[]>("/api/employees");
  }

  getById(id: string) {
    return this.http.get<Employee>("/api/employees/" + id);
  }

  create(employee: Employee) {
    return this.http.post("/api/employees", employee);
  }

  update(employee: Employee) {
    return this.http.put("/api/employees", employee);
  }

  delete(id: string) {
    return this.http.delete("/api/employees/" + id);
  }
}
