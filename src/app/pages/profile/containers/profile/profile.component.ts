import {Component, OnInit} from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import {fadeIn} from '@app/animations/fadeIn.animation';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [fadeIn]
})
export class ProfileComponent implements OnInit {

  user$ = this.auth.profile$;

  nameInput = '';

  editName = false;
  changePassword = false;

  changePasswordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {validators: this.checkPasswords});

  constructor(private auth: AuthService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  submitName(): void {
    console.log(this.nameInput);
    this.editName = false;
  }

  submitChangePassword(): void {
    console.log(this.changePasswordForm.value);
    this.changePassword = false;
  }

  checkPasswords(group: FormGroup): null | { notSame: boolean } {

    // tslint:disable-next-line:no-non-null-assertion
    const password = group.get('newPassword')!.value;

    // tslint:disable-next-line:no-non-null-assertion
    const confirmPassword = group.get('confirmPassword')!.value;

    return password === confirmPassword ? null : {notSame: true};
  }
}
