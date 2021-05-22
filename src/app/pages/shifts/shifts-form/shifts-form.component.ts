import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShiftsFormData } from '@app/pages/shifts/ShiftsFormData';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shifts-form',
  templateUrl: './shifts-form.component.html',
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 300px;
    }
  `]
})
export class ShiftsFormComponent implements OnInit {

  form = this.fb.group({
    name: [ '', Validators.required ],
    start_time: [ '', Validators.required ],
    end_time: [ '', Validators.required ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShiftsFormData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.type === 'edit' && this.data.shift) {
      this.form.patchValue(this.data.shift);
    }
  }

}
