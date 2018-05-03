
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';
import { IRegisterMatch } from './_interfaces/match.interface';
import { IValidator } from './_interfaces/validator.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public username: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public password2: AbstractControl;

  public emailMaxLength = 1024;
  public minLength = 6;
  public passMaxLength = 256;

  private errors: any = '';
  private validPass: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject('IRegisterMatch') private passwordsMatch: IRegisterMatch,
    @Inject('IValidator') private passwordsValidator: IValidator,
  ) { }

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [
        Validators.minLength(this.minLength),
        Validators.required],
      ],
      email: ['', [
        Validators.maxLength(this.emailMaxLength),
        Validators.email,
        Validators.required],
      ],
      password: ['', [
        Validators.minLength(this.minLength),
        Validators.maxLength(this.passMaxLength),
        Validators.required],
      ],
      password2: ['', [
        Validators.required],
      ],
    },                                         {
        validator: [
          this.passwordsMatch.passwordsMatch,
          this.passwordsValidator.validate,
        ],
      });

    this.username = this.registerForm.get('username');
    this.email = this.registerForm.get('email');
    this.password = this.registerForm.get('password');
    this.password2 = this.registerForm.get('password2');
  }

  private register(): void {
    if (this.password.value !== this.password2.value) {
      this.validPass = 'Doesnt match';
      return;
    }

    const newUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.authService.register(newUser).subscribe(
      (x) => console.log(x),
      (err: HttpErrorResponse) => {
        console.log(err);

        if (!err) {
          this.router.navigateByUrl('/users/login');
        }
      },
    );
  }

  private getErrorMessage(field: AbstractControl, fieldName?: string): string {
    if (field.hasError('required')) {
      return `${fieldName} is required!`;
    } else if (field.hasError('email')) {
      return 'Invalid email!';
    } else if (field.hasError('minlength')) {
      const fieldLength = field.errors.minlength.requiredLength;

      return `Your ${fieldName} must be at least ${fieldLength} symbols!`;
    } else if (field.hasError('passwordMatch')) {
      return 'Passwords don`t match!';
    } else if (field.hasError('passwordValidate')) {
      return 'INVALID';
    }
    return null;
  }
}
