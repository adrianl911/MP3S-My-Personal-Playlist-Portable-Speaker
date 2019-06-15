import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.less']
})
export class PlaylistsComponent implements OnInit {
  
  artists: any;
  albums: any;
  songs: any;

  constructor(private data: DataService) { }

  ngOnInit() {
  	this.data.getArtists().subscribe((data) => {
      this.artists = data;
      console.log("this.artists:", this.artists);
    });
    this.data.getSongs().subscribe((data) => {
      this.songs = data;
      console.log("this.songs:", this.songs);
    });
    this.data.getAlbums().subscribe((data) => {
      this.albums = data;
      console.log("this.albums:", this.albums);
    });
  }

}
