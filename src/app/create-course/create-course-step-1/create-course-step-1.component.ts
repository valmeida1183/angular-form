import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { courseTitleValidator } from "../../validators/course-title.validator";
import { CourseCategory } from "../../model/course-category";

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  form = this.formBuilder.group({
    title: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
        asyncValidators: [courseTitleValidator(this.courseService)],
        updateOn: "blur",
      },
    ],
    releaseAt: [new Date(), Validators.required],
    donwloadAllowed: [false, Validators.requiredTrue],
    longDescription: ["", [Validators.required, Validators.minLength(3)]],
    category: ["BEGINNER", Validators.required],
    // address: [null, Validators.required],
  });

  courseCategories$: Observable<CourseCategory[]>;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService
  ) {}

  ngOnInit() {
    this.courseCategories$ = this.courseService.findCourseCategories();

    const draft = localStorage.getItem("STEP_1");
    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }

    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((val) => {
        localStorage.setItem("STEP_1", JSON.stringify(val));
      });
  }

  get courseTitle() {
    return this.form.controls["title"];
  }
}
