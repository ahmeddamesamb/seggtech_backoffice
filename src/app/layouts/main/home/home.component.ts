import { Component } from '@angular/core';
import {HeaderComponent} from "../../header/header/header.component";
import {MainComponent} from "../main.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    MainComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
