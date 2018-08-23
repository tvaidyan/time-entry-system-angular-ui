import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Department } from "../models/Department";

@Injectable({
  providedIn: "root"
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Department[]>("/api/departments");
  }

  getById(id: number) {
    return this.http.get<Department>("/api/departments/" + id);
  }

  create(department: Department) {
    return this.http.post("/api/departments", department);
  }

  update(department: Department) {
    return this.http.put("/api/departments", department);
  }

  delete(id: number) {
    return this.http.delete("/api/departments/" + id);
  }
}
