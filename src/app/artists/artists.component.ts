import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.less']
})

export class ArtistsComponent implements OnInit {

  artists: any;
  albums: any;
  songs: any;
  songs$: any;
  constructor(private data: DataService) { }

  ngOnInit() {
    let artistId, artistName;
    let albumId, albumName;
    let albumList: any[];
    this.data.getArtists().subscribe((data) => {
      this.artists = data;
    });
    this.data.getSongs().subscribe((data) => {
      this.songs = data;
    });
    this.data.getAlbums().subscribe((data) => {
      this.albums = data;
    });
  }

}
