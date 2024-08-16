import { Routes } from '@angular/router';
import { AuthComponent } from "./layouts/main/auth/auth.component";
import { MainComponent } from "./layouts/main/main.component";
import { HomeComponent } from "./layouts/main/home/home.component";
import { HeaderComponent } from "./layouts/header/header/header.component";

export const routes: Routes = [
  {
    path: '', component: AuthComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'header', component: HeaderComponent
  },
  {
    path: 'main', component: MainComponent
  },
  {
    path: '**', component: AuthComponent
  }
];
