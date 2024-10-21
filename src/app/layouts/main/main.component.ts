import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../services/user.service";
import {FloatLabelModule} from 'primeng/floatlabel';
import {ButtonModule} from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {ActivatedRoute, Router} from '@angular/router';
import {IUser} from "../models/iuser";
import {SharedService} from "../services/shared.service";

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
    InputTextModule,
    CardModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  paginatedUsers: IUser[] = [];
  inactiveUsers: IUser[] = [];
  user: IUser | any;
  filters: { email?: string; nom?: string } = {};
  pageSize = 9;
  page = 1;
  collectionSize = 0;
  showAddUserForm = false;
  showUpdateUserForm = false;
  showCardUser = false;
  showArchivedUsers = false;
  showArchivedUsersCard = false;
  userId: number | undefined;

  newUser: IUser = {
    nom: '',
    email: '',
    password: '',
    telephone: '' // Ajout du champ telephone requis
  };

  constructor(private userService: UserService, private sharedService: SharedService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  openAddUserPopup() {
    this.showAddUserForm = true;
  }

  openCardUserPopup() {
    this.showCardUser = true;
  }

  openUpdateUserPopup() {
    this.showUpdateUserForm = true;
  }

  closeAddUserPopup() {
    this.showAddUserForm = false;
  }

  closeUpdateUserPopup() {
    this.showUpdateUserForm = false;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data.filter(user => user.is_active);
      this.filteredUsers = this.users;
      this.collectionSize = this.filteredUsers.length;
      this.refreshUsers();
    });
  }


  getArchivedUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.inactiveUsers = data.filter(user => !user.is_active);
      console.warn(this.inactiveUsers)
      // this.sharedService.booleanState$.subscribe((state: boolean) => {
      //   this.showArchivedUsersCard = state;
      // })
      // this.showArchivedUsersCard = true;
    });
  }

  activateUser(id?: number) {
    this.userService.activateUser(id).subscribe(() => {
      this.getAllUsers();
      this.getArchivedUsers();
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

  refreshUsers() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  createUser() {
    alert('Événement "Ajouter Utilisateur" reçu dans MainComponent');
    console.log('Événement "Ajouter Utilisateur" reçu dans MainComponent');
    this.userService.saveUser(this.newUser).subscribe(() => {
      this.getAllUsers();
      this.closeAddUserPopup();
      this.newUser = {nom: '', email: '', password: '', telephone: ''};
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getAllUsers();
    });
  }

  archiveUser(id?: number) {
    this.userService.archiveUser(id).subscribe(() => {
      this.getAllUsers();
    });
  }

  updateUser(id?: number, user?: IUser) {
    this.userService.updateUser(id, user).subscribe(() => {
      this.getAllUsers();
    });
  }

  navigateToUserDetail(userId?: number): void {
    this.userService.getUserById(userId).subscribe(
      (data: IUser) => {
        this.user = data;
        this.router.navigate(['/user-detail', userId]);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
