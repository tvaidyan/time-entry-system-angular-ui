import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../services/project.service";
import { Project } from "../models/project";
import { FormArray, FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.css"]
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;
  childProjects: Project[][] = [];
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectHierarchy: new FormArray([])
    });

    //this.getChildProjects(0);
    this.addProjectsDropdown(0, null);
  }

  saveProject() {}

  addProjectsDropdown(parentProjectId: number, index: number) {
    console.log("index", index);
    if (index >= 0) {
      console.log("got an index of", index);

      // kill
      // for(let x of (<FormArray>this.projectForm.get("projectHierarchy")).controls){
      //   console.log("id is: ", x)
      // }
      let formArrayLength = (<FormArray>(
        this.projectForm.get("projectHierarchy")
      )).controls.length;
      if (formArrayLength > 0) {
        for (let i = index + 1; i < formArrayLength; i++) {
          console.log("i is" + i);
          (<FormArray>this.projectForm.get("projectHierarchy")).removeAt(i);
        }
      }
    } else {
      console.log("no grandparent");
    }

    if (parentProjectId >= 0) {
      this.projectService
        .getChildProjects(parentProjectId)
        .subscribe(childProjects => {
          if (childProjects.length > 0) {
            this.childProjects[parentProjectId] = childProjects;

            (<FormArray>this.projectForm.get("projectHierarchy")).push(
              new FormControl({
                projects: this.childProjects[parentProjectId],
                projectId: parentProjectId
              })
            );
          }
        });
    }
  }

  getChildProjects(parentProjectId: number) {
    return this.projectService
      .getChildProjects(parentProjectId)
      .subscribe(childProjects => {
        console.log("47", childProjects);
        this.childProjects[parentProjectId] = childProjects;
      });
  }
}
