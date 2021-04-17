import {Component, OnInit} from '@angular/core'
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  userForm: FormGroup
  submitted = false

  constructor(
    public formBuilder: FormBuilder,
    public auth: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get getControl(): { [p: string]: AbstractControl } {
    return this.userForm.controls
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return
    }
    const user = {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      returnSecureToken: true
    }
    this.submitted = true
    this.auth.login(user).subscribe( res => {
        this.userForm.reset()
        this.router.navigate(['/admin', 'dashboard'])
        this.submitted = false
      }, () => {
        this.submitted = false
      }
    )
  }

}
