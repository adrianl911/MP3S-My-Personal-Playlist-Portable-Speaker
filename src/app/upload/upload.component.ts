import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import slugify from 'slugify';

let xhttp = new XMLHttpRequest();

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {

  isLinear = false;
  artists: any;
  albums:any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  artistSelection: string;
  albumSelection: string;
  value = '';

  update(value: string) { this.value = value; }

  constructor(private _formBuilder: FormBuilder, private data: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.data.getArtists().subscribe((data) => {
      this.artists = data;
    });
    this.data.getAlbums().subscribe((data) => {
      this.albums = data;
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    let slug = slugify(event.target.files[0].name.slice(0, -4));
  }

  pushArtist(artistName) {
    console.log(artistName);
  }

  pushAlbum(albumName) {
    console.log(albumName);
  }

  pushToFirebase() {

  }

  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('http://192.168.43.32:5000/api/upload', fd).subscribe();
  }

}
