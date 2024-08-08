import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Auth } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currentUser: Auth | undefined;

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.currentUser = undefined;
  }

  ngOnInit(): void {
    this.verifyUserLogged();
  }

  private verifyUserLogged() {

    this.authService.getLoggedUser()
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    const result = this.authService.logout();
  }


}
