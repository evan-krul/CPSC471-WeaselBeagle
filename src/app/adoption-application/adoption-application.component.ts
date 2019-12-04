import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-adoption-application',
  templateUrl: './adoption-application.component.html',
  styleUrls: ['./adoption-application.component.css']
})
export class AdoptionApplicationComponent implements OnInit {
  public adopterForm;

  constructor(private formBuilder: FormBuilder) {
    this.adopterForm = this.formBuilder.group({
      email: '',
      firstname: '',
      lastname: '',
      primaryPhone: ''
    });
  }

  ngOnInit() {
  }

}
