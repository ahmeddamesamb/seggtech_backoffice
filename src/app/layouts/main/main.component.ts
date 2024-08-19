import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../services/user.service";
import { Iuser } from "../models/iuser";
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule,
    FloatLabelModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  users: Iuser[] = [];
  filteredUsers: Iuser[] = [];
  user: Iuser | undefined;
  filters: { email?: string; nom?: string } = {};
  paginatedUsers: Iuser[] = [];
  pageSize = 9;
  page = 1;
  collectionSize = 0;
  showAddUserForm = false;

  // New user data
  newUser: Iuser = {
    nom: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  openAddUserPopup() {
    this.showAddUserForm = true;
  }
  openUpdateUserPopup() {
    this.showAddUserForm = true;
  }

  closeAddUserPopup() {
    this.showAddUserForm = false;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.filterData();
    });
  }

  filterData(): void {
    this.filteredUsers = this.users.filter((user) => {
      const nomMatches = this.filters.nom
        ? user.nom?.toUpperCase().includes(this.filters.nom.toUpperCase())
        : true;

      const emailMatches = this.filters.email
        ? user.email?.toUpperCase().includes(this.filters.email.toUpperCase())
        : true;

      return nomMatches && emailMatches;
    });

    this.collectionSize = this.filteredUsers.length;
    this.refreshUsers();
  }


  getOneUser(id: number) {
    this.userService.getUserById(id).subscribe((data) => {
      this.user = data;
      console.warn("get One user:", this.user);
    });
  }

  createUser() {
    this.userService.saveUser(this.newUser).subscribe(() => {
      this.getAllUsers(); // Refresh the list after adding a user
      this.closeAddUserPopup(); // Close the popup after creating a user
      this.newUser = { nom: '', email: '' }; // Reset the form
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getAllUsers(); // Refresh the list after deletion
    });
  }

  updateUser(id: number, user: Iuser) {
    this.userService.updateUser(id, user).subscribe(() => {
      this.getAllUsers(); // Refresh the list after update
    });
  }

  refreshUsers() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }
}
