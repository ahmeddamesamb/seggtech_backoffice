import {Component} from '@angular/core';
import {HeaderComponent} from "../../header/header/header.component";
import {MainComponent} from "../main.component";
import {SidebarComponent} from "../../sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    MainComponent,
    SidebarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
