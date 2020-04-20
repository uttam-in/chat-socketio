import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from  '../services/auth.service';
import { CONSTANTS } from '../url';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;
  constructor(
    private socket: Socket,
    private authService: AuthService, 
    private router: Router, 
    private formBuilder: FormBuilder ) 
    {}
  ngOnInit(): void {
    this.loginForm  =  this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get formControls() { return this.loginForm.controls; }
  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      res=>{
          let key = Object.keys(res)
          if(key[0]== CONSTANTS.auth_token){
            sessionStorage.setItem(CONSTANTS.auth_token, res[CONSTANTS.auth_token]); 
            this.authService.getchatid(this.loginForm.value).subscribe(
              res =>{                
                sessionStorage.setItem(CONSTANTS.chatid ,res[CONSTANTS.chatid]); 
                this.router.navigateByUrl(CONSTANTS.loadpage);                   
              }
            )                           
          }else{
            console.log("Invalid Login")
          }
      }
    )    
  }
}