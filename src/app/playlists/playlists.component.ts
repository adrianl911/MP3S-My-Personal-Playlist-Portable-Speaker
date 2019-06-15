import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.less']
})
export class PlaylistsComponent implements OnInit {
  
  name: string;
  artists: any;
  albums: any;
  songs: any;
  playlists: any;

  constructor(private data: DataService, public dialog: MatDialog) { }

  ngOnInit() {
  	this.data.getArtists().subscribe((data) => {
      this.artists = data;
      // console.log("this.artists:", this.artists);
    });
    this.data.getSongs().subscribe((data) => {
      this.songs = data;
      // console.log("this.songs:", this.songs);
    });
    this.data.getAlbums().subscribe((data) => {
      this.albums = data;
      // console.log("this.albums:", this.albums);
    });
    this.data.getPlaylists().subscribe((data) => {
      this.playlists = data;
    });
    // console.log("this.playlists:", this.playlists);
    // for (var i = 0; i < this.playlists.length; i++) { 
    //   	console.log("this.playlists[i].songs:", this.playlists[i].songs);
    // }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
    	width: '250px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}