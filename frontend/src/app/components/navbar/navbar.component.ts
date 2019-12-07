import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn : boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private token : TokenService) { }

  ngOnInit() {
    this.authService.authStatus.subscribe(value => this.loggedIn = value);
  }

  logOut(e: MouseEvent){
    e.preventDefault();
    this.token.remove();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    
  }

}
