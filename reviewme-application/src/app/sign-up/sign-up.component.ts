import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { validUserName, validPasswordMatch } from '../../../custom-validators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { AuthenticationService } from '../authentication.service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDividerModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit, OnDestroy{

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {}

  signUpForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, validUserName()]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  }, { validator: [validPasswordMatch()] });

  private signUpSubscription?: Subscription = undefined;

  signUp(): void {
    console.log(this.signUpForm);
    this.signUpSubscription = this.authService.signUp(this.signUpForm.value)
    .subscribe((result) => {
      console.log(result);
    })
  }

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
      if(this.signUpSubscription){
        this.signUpSubscription.unsubscribe();
      }
  }
}
