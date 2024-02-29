import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { UserLogged } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit {
  UserProfile!: UserLogged;
  constructor(
    public authService: AuthService,
    public router: Router
    ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    }, (error) => {
      console.log(error);
      
    });
  }
  ngOnInit() {}
}