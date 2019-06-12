import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import {MyData,MyArtist,MySong,MyAlbum} from './interface'
//import { AngularFireDatabase } from "angularfire2/database-deprecated";
//import * as firebase from 'firebase';
//import { AngularFireDatabase } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class DataService {
	dataArtist: MyArtist[] =[];
  dataAlbum: MyAlbum[] = [];
  dataSong: MySong[] = [];
  items: any;
  //constructor(private http: HttpClient) { }
	constructor(private db: AngularFireDatabase) {
      this.fetchArtists();
      this.fetchAlbums();
      this.fetchSongs();
  }

  fetchArtists() {
    let firebaseList = this.db.list('/artists').snapshotChanges().subscribe(actions => {
        //this.dataArtist = [];
        actions.forEach(action => {
          let value = action.payload.val() as MyArtist;
          let id = action.payload.key;
          var obj: MyArtist ;
          obj = { id: id, name: value.name};
          this.dataArtist.push(obj);
        });
      });
  }
  getArtists(): Observable<MyArtist[]> {
    return of(this.dataArtist);
  }
  fetchAlbums() {
    let firebaseList = this.db.list('/albums').snapshotChanges().subscribe(actions => {
        //this.dataArtist = [];
        actions.forEach(action => {
          let value = action.payload.val() as MyAlbum;
          let id = action.payload.key;
          value.id = id;
          this.getArtists().subscribe((artistList) => {
            artistList.forEach(artist => {
              if(artist.id == value.artistId) {
                value.artistName = artist.name;
                this.dataAlbum.push(value);
              }
            });
          });
        });
      });
  }
  getAlbums(): Observable<MyAlbum[]> {
    return of(this.dataAlbum);
  }
  fetchSongs() {
    let firebaseList = this.db.list('/songs').snapshotChanges().subscribe(actions => {
        //this.dataArtist = [];
        actions.forEach(action => {
          let value = action.payload.val() as MySong;
          let id = action.payload.key;
          value.id = id;
          this.getAlbums().subscribe((albumsList) => {
            albumsList.forEach(album => {
              if(album.id == value.albumId) {
                value.artistName = album.artistName;
                value.albumName = album.name;
                this.dataSong.push(value);
              }
            });
          });
        });
      });
  }
  
  getSongs(): Observable<MySong[]> {
    return of(this.dataSong);
  }
  // getSong(artistId, artistName, albumId, albumName) {
  //   return new Promise((resolve, reject) => {
  //     if(this.dataSong.length > 0) {
  //       resolve(this.dataSong);
  //       return;
  //     }
  //     let firebaseList = this.db.list('songs', ref => ref.orderByChild('albumId').equalTo(Number(albumId))).snapshotChanges().subscribe(actions => {

  //       actions.forEach(action => {
  //         //console.log("id of",artistId);
  //         let value = action.payload.val() as MySong;
  //         let id = action.payload.key;
  //         value.id = id;
  //         value.artistId = artistId;
  //         value.albumId = albumId;
  //         value.artistName = artistName;
  //         value.albumName = albumName;
  //         this.dataSong.push(value);
  //       });
  //       resolve(this.dataSong);
  //     });
  //   });
  // }
  // getAlbum(artistId,artistName) {
  //   return new Promise((resolve, reject) => {
  //     let firebaseList = this.db.list('albums', ref => ref.orderByChild('artistId').equalTo(Number(artistId))).snapshotChanges().subscribe(actions => {

  //       actions.forEach(action => {
  //         //console.log("id of",artistId);
  //         let value = action.payload.val() as MyAlbum;
  //         let id = action.payload.key;
  //         // var obj: MyAlbum ;
  //         value.id = id;
  //         value.artistId = artistId;
  //         //obj = { id: id, name: value.name, artistName: artistName, artistId: artistId};
  //         //console.log("value",value);
  //         this.dataAlbum.push(value);
  //       });
  //       resolve(this.dataAlbum);
  //     });
  //   });
  // }
}
