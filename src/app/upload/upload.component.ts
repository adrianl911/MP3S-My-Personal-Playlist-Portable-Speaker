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

  info: any;
  infoAlbum: any;
  infoSong: any;
  lastArtistId: any;

  selectedFile: File = null;

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

  artistExists(artistName) {
    for (var i = 0; i < this.artists.length; i++) {
      if (this.artists[i].name == artistName) {
        this.info = {"id": this.artists[i].id, "name": this.artists[i].name};
        return true;
      }
    }
    return false;
  }
  albumExists(albumName) {
    for (var i = 0; i < this.albums.length; i++) {
      if (this.albums[i].name == albumName) {
        this.infoAlbum = {"id": Number(this.albums[i].id), "artistId": this.albums[i].artistId, "name": this.albums[i].name};
        return true;
      }
    }
    return false;
  }

  pushArtist(artistName) {
    this.info = {"name": artistName};
    if (!this.artistExists(artistName)) {
      this.data.pushArtist(this.info);
    }
  }
  pushAlbum(albumName) {
    if (!this.albumExists(albumName)) {
      for (var i = 0; i < this.artists.length; i++) {
        if (this.artists[i].name == this.info.name) {
          this.infoAlbum = {"artistId": this.artists[i].id, "name": albumName};
        }
      }
      this.data.pushAlbum(this.infoAlbum);
    }
  }
  pushSong(songName) {
    for (var i = 0; i < this.albums.length; i++) {
      if(this.albums[i].name == this.infoAlbum.name) {
        this.infoSong = {"albumId": this.albums[i].id, "artistId": this.infoAlbum.artistId, "name": songName, "slug": slugify(songName)};
      }
    }
    this.data.pushSong(this.infoSong);
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    let slug = slugify(event.target.files[0].name.slice(0, -4));
    this.pushSong(event.target.files[0].name.slice(0, -4));
  }
  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('http://192.168.43.32:5000/api/upload', fd).subscribe();
    setTimeout(function() {location.reload()}, 2000);
  }

}
