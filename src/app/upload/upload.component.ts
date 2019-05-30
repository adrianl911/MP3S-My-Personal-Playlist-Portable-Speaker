import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

let xhttp = new XMLHttpRequest();

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {

  isLinear = false;
  artists: Object;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  artistSelection: string;
  albumSelection: string;
  value = '';

  update(value: string) { this.value = value; }

  constructor(private _formBuilder: FormBuilder, private data: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.data.getArtist().then((data) => { this.artists = data })

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });

    console.log("artistSelection: ", this.artistSelection);
  }

  uploadSong() {
    xhttp.open("POST", "http://192.168.43.32:5000/api/upload", false);
    xhttp.send();
  }

  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('http://192.168.43.32:5000/api/upload', fd).subscribe();
  }

}
