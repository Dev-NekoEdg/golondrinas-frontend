import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public sendRequest: boolean = false;
  public responseLogin: boolean = false;
  public messageResponse: string = '';

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private routing: Router
  ) {
    this.loginForm = this.loadForm();
  }

  ngOnInit(): void {
  }
  loadForm() {
    return this.builder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  login(): void {
    const user = this.loginForm.controls['user']?.value;
    const pass = this.loginForm.controls['pass']?.value;

    const result = this.service.login(user, pass);
    console.log({ result });
    this.sendRequest = true;
    if (!result) {
      this.responseLogin = false;
      this.messageResponse = "User or password are incorrect...";
    }
    else {
      this.responseLogin = true;
      this.messageResponse = "OK";

      setTimeout(() => {
        this.routing.navigate(['home']);
      }, 2000);
    }

  }
}
