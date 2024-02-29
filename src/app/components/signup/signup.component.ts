import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
    });
  }
  ngOnInit() { }
  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      (result) => {
        this.registerForm.reset();
        this.router.navigate(['login']);
      },
      (error) => {
        this.errors = error.error;
        Swal.fire({
          title: 'Error',
          text: this.errors.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  redirect(type: string) {
    this.router.navigate([type]);
  }
}
