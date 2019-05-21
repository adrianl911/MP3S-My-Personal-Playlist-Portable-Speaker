import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	data: Observable<any[]>;
  //constructor(private http: HttpClient) { }
	constructor(private db: AngularFireDatabase) { }

  getArtist() {
    return new Promise((resolve, reject) => {
      this.data = this.db.list('0').valueChanges();
      this.data.subscribe((data1) => {console.log(data1); resolve(data1)})
    });  
    //return this.http.get('http://192.168.43.32:8080/');
    //return this.http.get('http://135.243.227.41:3000/');
  }
}
