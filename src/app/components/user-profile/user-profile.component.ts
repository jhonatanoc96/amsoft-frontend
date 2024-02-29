import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { UserLogged } from '../../models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit {
  UserProfile: UserLogged = {
    name: '',
    email: '',
    created_at: new Date(),
  };

  constructor(
    public authService: AuthService,
    public router: Router
    ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      console.log(this.UserProfile);
      
    }, (error) => {
      console.log(error);
      
    });
  }
  ngOnInit() {}
}