import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import slugify from 'slugify';
import {MyData, MyArtist, MySong, MyAlbum, MyPlaylist} from '../interface'
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
  playlists: any;
  counter = 0;
  previousSong = "";

  constructor(private data: DataService) { }

  ngOnInit() {
    let artistId, artistName;
    let albumId, albumName;
    let albumList: any[];
    this.data.getSongs().subscribe((dataList) => {
      this.songs = dataList;
      console.log("this.songs:",this.songs);
    });
    this.data.getPlaylists().subscribe((data) => {
      this.playlists = data;
      console.log("this.playlists:", this.playlists);
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

  showPlay(source) {
    $(".play-arrow-" + source).show();
    $(".pause-" + source).hide();
  }

  showPause(source) {
    $(".play-arrow-" + source).hide();
    $(".pause-" + source).show();
  }

  playMusic(source) {
    let slug = slugify(source, '_');
    this.showPause(slug);

    let api = "http://192.168.43.32:5000/api/play/" + slug;

    if(this.previousSong != source)
    {
        this.counter = 0;
        this.showPlay(this.previousSong);
    }
    if (this.counter == 0) {
        xhttp.open("POST", api, false);
        xhttp.send();
        this.showPause(slug);
        this.counter++;
    }
    else {
      xhttp.open("POST", "http://192.168.43.32:5000/api/pause", false);
      xhttp.send();
      if ($(".pause-" + slug + ":hidden")) {
        this.showPause(slug);
      }
      else {
        this.showPlay(slug);
      }
    }
    this.previousSong = source;
  }

  pauseMusic(source) {
    let slug = slugify(source, '_');

  	xhttp.open("POST", "http://192.168.43.32:5000/api/pause", false);
	  xhttp.send();
	  if ($(".pause-" + slug).is(":visible")) {
      this.showPlay(slug);
    }
    else {
      this.showPause(slug);
    }
  }

  pushToPlaylist(id, name) {
    for (var i = 0; i < this.songs.length; i++) {
      if (this.songs[i].name == name) {
        console.log("this.songs[i]:", this.songs[i]);
        console.log("id:", id);
        this.data.pushToPlaylist(id, this.songs[i]);
      }
    }
  }
}
