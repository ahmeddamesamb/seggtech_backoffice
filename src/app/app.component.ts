import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from "./layouts/main/home/home.component";
import {MainComponent} from "./layouts/main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SEGGTECHFRONT';
}
