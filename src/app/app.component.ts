import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;
  weekdays: any[] = [
    {
      name: 'Monday'
    },
    {
      name: 'Tuesday'
    },
    {
      name: 'wednesday'
    }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  onSelected(data) {
    console.log(data);
  }

  createForm() {
    this.form = this.formBuilder.group({
      keyword: ''
       });
  }

}
