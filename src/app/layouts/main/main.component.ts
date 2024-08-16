import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../services/user.service";
import { Iuser } from "../models/iuser";
import {filter} from "rxjs";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule
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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.filterData();
    });
  }

  filterData(): void {
    this.filteredUsers = this.users.filter((user) => {
      return (
        (!this.filters.nom || this.filters.nom.toUpperCase().includes(this.filters.nom.toUpperCase())) &&
        (!this.filters.email || this.filters.email.toUpperCase().includes(this.filters.email.toUpperCase()))
      );
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
createUser(user:Iuser){
  this.userService.saveUser(user).subscribe(() => {
    this.user; // Refresh the list after deletion
  });
}
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.user; // Refresh the list after deletion
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
