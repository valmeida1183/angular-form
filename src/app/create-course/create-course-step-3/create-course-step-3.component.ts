import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "create-course-step-3",
  templateUrl: "create-course-step-3.component.html",
  styleUrls: ["create-course-step-3.component.scss"],
})
export class CreateCourseStep3Component implements OnInit {
  form = this.formBuilder.group({
    lessons: this.formBuilder.array([]),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  public get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  addLesson(): void {
    const lessonForm = this.formBuilder.group({
      title: ["", Validators.required],
      level: ["beginner", Validators.required],
    });

    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }
}
