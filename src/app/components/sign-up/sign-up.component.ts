import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit { 
  
  public signupForm : FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initFormGroup()
  }

  initFormGroup(){
    this.signupForm = this.formBuilder.group({
      id: new FormControl(null),
      fullname: new FormControl(null),
      email: new FormControl(null),
      mobile: new FormControl(null),
      password: new FormControl(null),
      check: new FormControl(null),
    })
  }

  public signUp(){
    console.log(this.signupForm.value)
    this.userService.registerUser(this.signupForm.value).subscribe({
      next:(res)=>{
        alert('User registered')
        this.signupForm.reset();
        this.router.navigate(['login'])
      },error:(err)=>{
        console.log(err)
      }
    })
  }

}
