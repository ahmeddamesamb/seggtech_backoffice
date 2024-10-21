import {Routes} from '@angular/router';
import {AuthComponent} from "./layouts/main/auth/auth.component";
import {MainComponent} from "./layouts/main/main.component";
import {HomeComponent} from "./layouts/main/home/home.component";
import {HeaderComponent} from "./layouts/header/header/header.component";
import {authGuard} from './layouts/guard/auth.guard';
import {UserDetailComponent} from './layouts/main/user-detail/user-detail.component';

export const routes: Routes = [
  {
    path: '', component: AuthComponent
  },
  {
    path: 'home', component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-detail/:id', component: UserDetailComponent,
    canActivate: [authGuard]  // Si c'était désactivé temporairement, active-le ici
  },
  {
    path: 'header', component: HeaderComponent,
    canActivate: [authGuard]
  },
  {
    path: 'main', component: MainComponent,
    canActivate: [authGuard]
  },
  {
    path: '**', redirectTo: ''  // Redirection par défaut vers l'authentification
  }
];
