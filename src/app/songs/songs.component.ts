import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

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

}
