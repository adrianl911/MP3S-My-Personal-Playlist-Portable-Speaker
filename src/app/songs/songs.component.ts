import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

let xhttp = new XMLHttpRequest();

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent implements OnInit {

  artists: Object;
  songs$: any;
  counter = 0;
  previousSong = "";

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getArtist().then((data) => { this.artists = data })
    // this.artists = this.data.getArtist()
    // this.data.getArtist().subscribe(
    //   data => this.artists = data
    // )
  }

  playMusic(source) {
    console.log("source: ", source);
    console.log("play: ", this.counter);

    $(".play-arrow-" + source).hide();
    $(".pause-" + source).show();

    let api = "http://192.168.43.32:5000/api/play/" + source;
    console.log(this.previousSong + " AFARA");
    if(this.previousSong != source)
    {
        this.counter = 0;
        console.log(this.previousSong + " IN");
        $(".play-arrow-" + this.previousSong).show();
        $(".pause-" + this.previousSong).hide();
    }

    if (this.counter == 0) {
        xhttp.open("POST", api, false);
        xhttp.send();
        $(".play-arrow-" + source).hide();
        $(".pause-" + source).show();
        this.counter++;
    }
    else {

        xhttp.open("POST", "http://192.168.43.32:5000/api/pause", false);
        xhttp.send();
        if ($(".pause-" + source + ":hidden")) {
            $(".pause-" + source).show();
            $(".play-arrow-" + source).hide();
        }
        else {
            $(".play-arrow-" + source).show();
            $(".pause-" + source).hide();
        }

    }
this.previousSong = source;
    console.log(this.previousSong + " nebunia lui salam");
    }
  pauseMusic(source) {
  	xhttp.open("POST", "http://192.168.43.32:5000/api/pause", false);
	  xhttp.send();
	  console.log("pause: " + this.counter);
	if ($(".pause-" + source).is(":visible")) {
            $(".pause-" + source).hide();
            $(".play-arrow-" + source).show();
    }
    else {
            $(".play-arrow-" + source).hide();
            $(".pause-" + source).show();
    }
  }
}
