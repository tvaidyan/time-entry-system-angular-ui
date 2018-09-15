import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Project } from "../models/project";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Project[]>("/api/projects");
  }

  getById(id: number) {
    return this.http.get<Project>("/api/projects/" + id);
  }

  create(project: Project) {
    return this.http.post("/api/projects", project);
  }

  update(project: Project) {
    return this.http.put("/api/projects", project);
  }

  delete(id: number) {
    return this.http.delete("/api/projects/" + id);
  }

  getChildProjects(parentProjectId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`/api/projects/${parentProjectId}/child-projects`);
  }
}
