import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

let xhttp = new XMLHttpRequest();
let counter = 0;

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent implements OnInit {

  artists: Object;
  songs$: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getArtist().subscribe(
      data => this.artists = data
    )
  }

  playMusic(source) {
    // console.log(source);
    // let audio = new Audio();
    // console.log(audio);
    // audio.src = source;
    // audio.play();
    console.log("LABA 3: " + counter);
    if (counter == 0) {
    //xhttp.open("POST", "http://192.168.43.32:5000/api/play/DNA", false);
    //		xhttp.send();
		counter++;
		console.log("LABA: " + counter);
	}
	else {
	//	xhttp.open("POST", "http://192.168.43.32:5000/api/pause", false);
	//	xhttp.send();
		console.log("LABA 2: " + counter);
	}
  }
}
counter ++;
