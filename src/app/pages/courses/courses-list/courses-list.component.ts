import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Router } from "@angular/router";

import { CoursesService } from "../courses.service";

import { environment } from "src/environments/environment.prod";

import { IListCardModel } from "src/app/interfaces/list-card.model";
import Course from "../../../interfaces/course.model";
import { IList } from "../../../interfaces/list.model";
import { ActionButton } from "src/app/interfaces/action-button.model";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"]
})
export class CoursesListComponent implements OnInit {
  @Output() showCourseById = new EventEmitter<ActionButton>();
  @Input() listTemplate: IListCardModel;
  @Input() isNavigable = true;

  apiUrl = `${environment.coursesPath}`;

  isHidden = true;
  courses: Course[] = [];

  constructor(private coursesService: CoursesService, private router: Router) {}

  async ngOnInit() {
    this.courses = await this.coursesService.getCourses();
    if (!this.listTemplate) {
      this.listTemplate = "fullwidth";
    }
  }

  mapCoursesListDetails() {
    const coursesMapped: IList[] = this.courses.map((course) => {
      return {
        id: course.id,
        title: `Corso ${course.year}`,
        description: "Catania",
        buttons: [
          {
            text: "Show",
            color: "primary"
          },
          {
            text: "Delete",
            color: "danger"
          }
        ]
      };
    });
    return coursesMapped;
  }

  async onActionToCourse(action: ActionButton) {
    console.log(action);
    this.isHidden = false;
    if (this.isNavigable) {
      this.router.navigate([`${this.apiUrl}/${action.id}`]);
    } else if (action.text === "Show") {
      this.showCourseById.emit(action);
    } else if (action.text === "Delete") {
      this.courses.map((course, index) => {
        if (course.id === action.id) {
          this.courses.splice(index, 1);
        }
      });
      await this.coursesService.deleteCourseById(action.id);
    }
  }
}
