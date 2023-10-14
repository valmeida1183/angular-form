import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { filter } from "rxjs/operators";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  formInitVal = {
    email: "hello@gmail.com",
    password: `123456`,
  };

  @ViewChild(NgForm, { static: true })
  loginForm: NgForm;

  constructor() {}

  ngOnInit() {
    this.loginForm.valueChanges
      .pipe(filter(() => this.loginForm.valid))
      .subscribe((value) => console.log("Form Value changed: ", value));
  }

  login(loginForm: NgForm, submit) {
    console.log(loginForm.value, loginForm.valid, submit);
    console.log("initForm", this.formInitVal);
  }

  onEmailchange(change) {
    console.log(change);
    console.log(change.constructor.name);
  }
}
