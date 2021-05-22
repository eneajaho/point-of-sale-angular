import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryFormData } from '@app/pages/categories/CategoryFormData';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 300px;
    }
  `]
})
export class CategoryFormComponent implements OnInit {

  form = this.fb.group({
    name: [ '', Validators.required ],
    icon: [ '', Validators.required ],
    color: [ '', Validators.required ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CategoryFormData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data.type === 'edit' && this.data.category) {
      this.form.patchValue(this.data.category);
    }
  }

}
