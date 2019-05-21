import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {

  isLinear = true;
  artists: Object;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  artistSelection: string;
  albumSelection: string;
  value = '';

  update(value: string) { this.value = value; }

  constructor(private _formBuilder: FormBuilder, private data: DataService) {}

  ngOnInit() {

  	this.data.getArtist().then((data) => { this.artists = data })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    console.log("artistSelection: ", this.artistSelection);

  }

}
