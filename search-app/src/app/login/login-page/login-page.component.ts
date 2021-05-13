import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwitchApiService } from 'src/app/twitch-api.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  @Input() clientId: string = '';
  @Input() clientSecret: string = '';

  constructor(
    private twitchService: TwitchApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.twitchService.tryGetToken(this.clientId, this.clientSecret)
    .subscribe(succeed => {
      if (!succeed) {
        this.clientId = '';
        this.clientSecret = '';
      } else {
        this.router.navigate(['/search']);
      }
    });
  }
}
