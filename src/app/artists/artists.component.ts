import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.less']
})
export class ArtistsComponent implements OnInit {

  artists: Object;
  songs$: any;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getArtist().subscribe(
      data => this.artists = data
    )
  }

}
