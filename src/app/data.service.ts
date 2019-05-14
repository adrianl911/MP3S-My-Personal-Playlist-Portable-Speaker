import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getArtist() {
  	return this.http.get('http://192.168.43.32:8080/');
  //return this.http.get('http://135.243.227.41:3000/');
  }
}
