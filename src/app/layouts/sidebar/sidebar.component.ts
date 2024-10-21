import {Component} from '@angular/core';
import {SharedService} from "../services/shared.service";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {AuthService} from "../services/auth.service";
import {FloatLabelModule} from "primeng/floatlabel";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule,

  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private sharedService: SharedService, private authService: AuthService, private userService: UserService) {
  }

  onLogout() {
    this.authService.logout();
  }

  createUser() {

  }

  archiveUser() {
    this.sharedService.setBooleanState(true)
  }

}
