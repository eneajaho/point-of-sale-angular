import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { patternValidator } from '@core/utils/custom-validators';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() user?: User;
  @Input() readonly = false;


  @Output() submitted = new EventEmitter<User>();

  hide = true;

  roles = [
    {
      label: 'Manager',
      value: 'manager'
    },
    {
      label: 'Economist',
      value: 'economist'
    },
    {
      label: 'User',
      value: 'user'
    }
  ];

  form = this.fb.group({
    name: [ null, Validators.required ],
    email: [ null, Validators.required ],
    // password: [ null, Validators.compose([
    //   Validators.required,
    //   patternValidator(/\d/, { hasNumber: true }),
    //   patternValidator(/[A-Z]/, { hasCapitalCase: true }),
    //   patternValidator(/[a-z]/, { hasSmallCase: true }),
    //   patternValidator(/[!-\/:-@[-`{-~]/, { hasSpecialCharacters: true }),
    //   Validators.minLength(8)
    // ]) ],
    role: [ null, Validators.required ]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue(this.user);
    }
    if (this.readonly) {
      this.form.disable();
    }
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.value);
  }

}
