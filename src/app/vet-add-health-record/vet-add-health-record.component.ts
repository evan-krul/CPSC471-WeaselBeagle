import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-vet-add-health-record',
  templateUrl: './vet-add-health-record.component.html',
  styleUrls: ['./vet-add-health-record.component.css']
})
export class VetAddHealthRecordComponent implements OnInit {
  SERVER_URL = 'http://localhost:4300/api/vet/appointments/add-health-record/';
  SERVER_URL_GET_ANIMAL = 'http://localhost:4300/api/animal/get/';
  private animalID;

  private healthRecordForm;
  private animalInfo;
  private notifier;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.animalID = this.route.snapshot.paramMap.get('animal_id');
    this.healthRecordForm = this.formBuilder.group({
      type: '',
      comments: '',
    });
    this.getAnimal();
  }

  getAnimal() {
    this.httpClient.get<any>(this.SERVER_URL_GET_ANIMAL + this.animalID, {}).subscribe(
      (res) => {
        this.animalInfo = res;
        console.log(this.animalInfo);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

  onSubmit(newUserData) {
    this.httpClient.post<any>(this.SERVER_URL + this.animalID, newUserData).subscribe(
      () => {
        this.notifier.notify('success', 'Added a new health record for ' + this.animalInfo.name);
        this.router.navigate(['/vet/animals/view/' + this.animalID]);
      },
      (err) => {
        this.notifier.notify('error', 'Error: ' + err.error.message);
        console.log(err);
      }
    );
  }
}
