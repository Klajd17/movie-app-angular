import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup = new FormGroup ({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null),
      password: new FormControl(null),
      check: new FormControl(null),
    })
  }

  public login(){
    console.log(this.loginForm.value)
    this.userService.loginUser().subscribe({
      next:(res:any)=>{
        const user = res.find((a:any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (user){
          alert('Login Successfull')
          this.loginForm.reset()
          this.router.navigate(['movies/admin'])
        }
      }
    })
  }

}
