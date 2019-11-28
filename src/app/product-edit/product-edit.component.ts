import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  account;
  accountData;
  constructor() {
    this.account = JSON.parse(localStorage.getItem('currentUser'));
    this.accountData = JSON.parse(localStorage.getItem('currentUserData'));
  }

  ngOnInit() {
  }

}
