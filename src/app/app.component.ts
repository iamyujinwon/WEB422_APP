/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Yujin Won  Student ID: 153565197  Date: 2021-12-02
*
* Angular App (Deployed) Link: https://jolly-perlman-a0759c.netlify.app
*
* User API (Heroku) Link: https://obscure-bastion-86400.herokuapp.com/
*
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'web422-a4';
  searchString: string = "";
  token: any;

  constructor( private router: Router, private authService: AuthService ){ }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this.authService.readToken();
      }
    });
  }

  handleSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
