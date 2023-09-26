import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/password-strength.validator";

@Component({
  selector: "login",
  templateUrl: "./login-reactive.component.html",
  styleUrls: ["./login-reactive.component.css"],
})
export class LoginReactiveComponent implements OnInit {
  // email = new FormControl("", {
  //   updateOn: "blur",
  //   validators: [Validators.required, Validators.email],
  // });
  // password = new FormControl("", {
  //   validators: [
  //     Validators.required,
  //     Validators.minLength(8),
  //     createPasswordStrengthValidator(),
  //   ],
  // });

  // loginForm = new FormGroup({
  //   email: this.email,
  //   password: this.password,
  // });

  loginForm = this.formBuilder.group({
    email: [
      "",
      {
        validators: [Validators.required, Validators.email],
        updateOn: "blur",
      },
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
      ],
    ],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  get email() {
    return this.loginForm.controls["email"];
  }

  get password() {
    return this.loginForm.controls["password"];
  }

  onLogin() {
    const formValue = this.loginForm.value;
  }

  onReset() {
    this.loginForm.reset();
    console.log(this.loginForm.value);
  }
}
