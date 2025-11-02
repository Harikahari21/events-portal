import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRequest } from '../../models/auth-request';
import { AuthResponse } from '../../models/auth-response';
import { SecurityApi } from '../../services/security-api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected user: AuthRequest = new AuthRequest();
  protected authResponse: AuthResponse;
  private _securityApi = inject(SecurityApi);
  protected authErrorMessage?: string = '';
  private _router = inject(Router);

  private _activatedRoute = inject(ActivatedRoute);
  private _returnUrl: string;

  ngOnInit(): void {
    this._returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'];
  }

  protected onCredentialSubmit(): void {
    this._securityApi.authenticateCredentials(this.user).subscribe({
      next: (response) => {
        if (response.token) {
          if (this._returnUrl) {
            this._router.navigate([this._returnUrl]);
          } else {
            this._router.navigate(['/home']);
          }
        } else {
          this.authErrorMessage = response.message;
          setTimeout(() => {
            this.authErrorMessage = '';
          }, 5000);
        }
      },
    });
  }
}
