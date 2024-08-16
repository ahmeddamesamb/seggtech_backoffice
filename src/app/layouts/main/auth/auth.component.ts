import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule ici

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule] // Ajoutez HttpClientModule ici
})
export class AuthComponent implements OnInit {
  submitted: boolean = false;
  connexionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService // Injection du service AuthService
  ) {}

  ngOnInit(): void {
    this.connexionForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.connexionForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.connexionForm.invalid) {
      return;
    }
    this.authService.login(this.connexionForm.value); // Utilisation du service AuthService
  }
}
