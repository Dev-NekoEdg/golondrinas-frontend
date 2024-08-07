import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MyNestComponent } from './components/my-nest/my-nest.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:"home", component: HomeComponent, pathMatch: "full"},
  {path:"myNest", component: MyNestComponent, pathMatch: "full"},
  {path:"about", component: AboutComponent, pathMatch: "full"},
  {path:"login", component: LoginComponent, pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
