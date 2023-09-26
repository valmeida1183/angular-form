import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

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
  constructor() {}

  ngOnInit() {}

  login(loginForm: NgForm, submit) {
    console.log(loginForm.value, loginForm.valid, submit);
    console.log("initForm", this.formInitVal);
  }

  onEmailchange(change) {
    console.log(change);
    console.log(change.constructor.name);
  }
}
