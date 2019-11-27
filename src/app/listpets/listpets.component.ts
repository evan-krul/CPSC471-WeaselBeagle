import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-listpets',
  templateUrl: './listpets.component.html',
  styleUrls: ['./listpets.component.css']
})
export class ListpetsComponent implements OnInit {
  type;

  constructor(private route: ActivatedRoute) {

  }


  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');
  }

}
