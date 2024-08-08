import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth';
import { BehaviorSubject, empty, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: Auth | undefined;
  private currentUser$: BehaviorSubject<Auth | undefined>;

  constructor() {
    this.currentUser = undefined;
    this.currentUser$ = new BehaviorSubject<Auth | undefined>(undefined);
  }

  login(userName: string, password: string): boolean {
    let res: boolean = false;
    try {
      localStorage.removeItem(environment.loggedUser);

      if (password === '1234') {
        this.currentUser = this.defaultUser();
        localStorage.setItem(environment.loggedUser, JSON.stringify(this.currentUser));
        res = true;
      }
    }
    catch {
      localStorage.removeItem(environment.loggedUser);
      this.currentUser = undefined;
      res = false
    }
    this.currentUser$.next(this.currentUser);
    return res;
  }

  logout(): boolean{
    try {
      localStorage.removeItem(environment.loggedUser);
      this.currentUser$.next(undefined);
      return true;
    }
    catch {
     return false;
    }
  }

  getLoggedUser(): Observable<Auth | undefined>{
    const user= localStorage.getItem(environment.loggedUser);
    if(user){
      this.currentUser = JSON.parse(user);
      this.currentUser$.next(this.currentUser);
    }
    else{
      this.currentUser$.next(undefined);
    }

    return this.currentUser$.asObservable();
  }

  private defaultUser(): Auth {
    return {
      id: '123456',
      name: 'test',
      lastName: 'testing',
      userName: 'Test-X123',
      accessToken: 'null.null.null'
    };
  }

}
