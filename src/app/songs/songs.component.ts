import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import slugify from 'slugify';
import {MyData,MyArtist,MySong,MyAlbum} from '../interface'
let xhttp = new XMLHttpRequest();

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less']
})
export class SongsComponent implements OnInit {

  albums: any;
  artists: any;
  songs: any;
  song: any;
  counter = 0;
  previousSong = "";

  constructor(private data: DataService) { }

  ngOnInit() {
    let artistId, artistName;
    let albumId, albumName;
    let albumList: any[];
     this.data.getSongs().subscribe((dataList) => {
      this.songs = dataList;
     });

    //  .then((data) => { 
    //   this.artists = data;
    //   for (var i = this.artists.length - 1; i >= 0; i--) {
    //     artistId = this.artists[i].id;
    //     artistName = this.artists[i].name;
    //     this.data.getAlbum(artistId,artistName).then((dataAlbum) => {
    //       this.albums = dataAlbum;
    //       for (var j = this.albums.length - 1; j >= 0; j--) {
    //         albumId = this.albums[j].id;
    //         albumName = this.albums[j].name;
    //         this.data.getSong(artistId, artistName, albumId, albumName).then((songList) => {
    //           this.songs = songList;
    //           //console.log(this.songs);
    //         });
    //       }
    //     });
    //   }
    //   //console.log("songs: ", this.songs);

    // });
    

    // this.artists = this.data.getArtist()
    // this.data.getArtist().subscribe(
    //   data => this.artists = data
    // )
  }

  playMusic(source) {
    let slug = slugify(source);

    console.log("source: ", source);
    console.log("play: ", this.counter);

    $(".play-arrow-" + slug).hide();
    $(".pause-" + slug).show();

    let api = "http://192.168.43.32:5000/api/play/" + source;
    console.log(this.previousSong + " AFARA");
    if(this.previousSong != source)
    {
        this.counter = 0;
        console.log(this.previousSong + " IN");
        $(".play-arrow-" + slugify(this.previousSong)).show();
        $(".pause-" + slugify(this.previousSong)).hide();
    }

    if (this.counter == 0) {
        xhttp.open("POST", api, false);
        xhttp.send();
        $(".play-arrow-" + slug).hide();
        $(".pause-" + slug).show();
        this.counter++;
    }
    else {
      xhttp.open("POST", "http://192.168.43.32:5000/api/pause", false);
      xhttp.send();
      if ($(".pause-" + slug + ":hidden")) {
        $(".pause-" + slug).show();
        $(".play-arrow-" + slug).hide();
      }
      else {
        $(".play-arrow-" + slug).show();
        $(".pause-" + slug).hide();
      }
    }
    this.previousSong = source;
    console.log("previousSong: ", this.previousSong);
  }

  pauseMusic(source) {
    let slug = slugify(source);

  	xhttp.open("POST", "http://192.168.43.32:5000/api/pause", false);
	  xhttp.send();
	  console.log("pause: " + this.counter);
	  if ($(".pause-" + slug).is(":visible")) {
            $(".pause-" + slug).hide();
            $(".play-arrow-" + slug).show();
    }
    else {
            $(".play-arrow-" + slug).hide();
            $(".pause-" + slug).show();
    }
  }
}
