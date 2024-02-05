import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { validUserName } from '../../../custom-validators'; 
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router'; 
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatDividerModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthenticationService){}
  loginClicked: boolean = false;
  loginForm: any = this.fb.group({
    username: ['',[Validators.required, validUserName()]],
    password: ['', [Validators.required]]
  });
  login(): void {
    this.authService.login(this.loginForm.value)
    .subscribe( data => {
      this.loginClicked = false;
    } )
  }
  ngOnInit(){
  }
}
