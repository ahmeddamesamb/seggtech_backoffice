import { Component } from '@angular/core';
import {HeaderComponent} from "../../header/header/header.component";
import { UserService } from '../../services/user.service';
import { Iuser } from '../../models/iuser';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports:  [
    HeaderComponent,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  user:  any;
  userId? = 1;
  constructor(private userService: UserService) {
}
  ngOnInit(): void {
    this.loadUser();
  }
  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe(
      (data: Iuser) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

}
